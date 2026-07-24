const genericNodePositions = {
  fintrust: [
    { x: 70, y: 105, label: 'Users', type: 'edge' },
    { x: 205, y: 105, label: 'ALB', type: 'route' },
    { x: 350, y: 72, label: 'Auto Scaling', type: 'compute' },
    { x: 350, y: 150, label: 'Containers', type: 'compute' },
    { x: 500, y: 72, label: 'RDS', type: 'data' },
    { x: 500, y: 150, label: 'Secrets', type: 'identity' },
    { x: 630, y: 105, label: 'CI Checks', type: 'signal' },
  ],
  novatech: [
    { x: 70, y: 108, label: 'Users', type: 'edge' },
    { x: 220, y: 108, label: 'CloudFront', type: 'route' },
    { x: 380, y: 108, label: 'Private S3', type: 'data' },
    { x: 220, y: 190, label: 'GitHub', type: 'compute' },
    { x: 380, y: 190, label: 'OIDC / STS', type: 'identity' },
    { x: 545, y: 190, label: 'Deploy Role', type: 'identity' },
    { x: 620, y: 108, label: 'Invalidation', type: 'signal' },
  ],
}

const genericPaths = {
  fintrust: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]],
  novatech: [[0, 1], [1, 2], [3, 4], [4, 5], [5, 2], [5, 6]],
}

function linePath(start, end) {
  const midpoint = (start.x + end.x) / 2
  return `M ${start.x} ${start.y} C ${midpoint} ${start.y}, ${midpoint} ${end.y}, ${end.x} ${end.y}`
}

function ArchitectureZone({ x, y, width, height, title, subtitle, tone = 'primary' }) {
  return (
    <g className={`architecture-zone architecture-zone--${tone}`}>
      <rect x={x} y={y} width={width} height={height} rx="24" />
      <text className="architecture-zone__title" x={x + 22} y={y + 28}>
        {title}
      </text>
      {subtitle && (
        <text className="architecture-zone__subtitle" x={x + 22} y={y + 47}>
          {subtitle}
        </text>
      )}
    </g>
  )
}

function ServiceNode({
  x,
  y,
  width = 180,
  height = 68,
  badge,
  title,
  subtitle,
  tone = 'compute',
  emphasized = false,
}) {
  return (
    <g
      className={`architecture-service architecture-service--${tone} ${
        emphasized ? 'architecture-service--emphasized' : ''
      }`}
      transform={`translate(${x} ${y})`}
    >
      <rect className="architecture-service__body" width={width} height={height} rx="17" />
      <rect className="architecture-service__badge" x="12" y="14" width="36" height="36" rx="10" />
      <text className="architecture-service__badge-text" x="30" y="37" textAnchor="middle">
        {badge}
      </text>
      <text className="architecture-service__title" x="59" y="28">
        {title}
      </text>
      <text className="architecture-service__subtitle" x="59" y="48">
        {subtitle}
      </text>
    </g>
  )
}

function FlowPath({ d, markerId, highlight = false, muted = false }) {
  return (
    <path
      className={`architecture-flow ${highlight ? 'architecture-flow--highlight' : ''} ${
        muted ? 'architecture-flow--muted' : ''
      }`}
      d={d}
      markerEnd={`url(#${markerId})`}
    />
  )
}

function ArrowMarker({ id, highlight = false }) {
  return (
    <marker id={id} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" className={highlight ? 'architecture-marker--highlight' : ''} />
    </marker>
  )
}

function LogiHaulDesktopDiagram() {
  const markerId = 'logihaul-arrow-desktop'
  const highlightMarkerId = 'logihaul-arrow-highlight-desktop'

  return (
    <svg
      className="architecture-diagram__desktop"
      viewBox="0 0 960 610"
      role="img"
      aria-labelledby="logihaul-desktop-title logihaul-desktop-description"
    >
      <title id="logihaul-desktop-title">LogiHaul layered AWS architecture</title>
      <desc id="logihaul-desktop-description">
        Users enter through an Application Load Balancer and an Auto Scaling web tier. The order
        intake path uses HTTP API, Lambda, and DynamoDB for the fifty-times traffic spike. Relational
        records use RDS MySQL, tracking uses ElastiCache, notifications are buffered through SQS,
        reports use S3, CloudWatch observes the system, and S3 data replicates to eu-west-1.
      </desc>

      <defs>
        <ArrowMarker id={markerId} />
        <ArrowMarker id={highlightMarkerId} highlight />
        <filter id="logihaul-node-shadow" x="-20%" y="-25%" width="140%" height="150%">
          <feDropShadow dx="0" dy="7" stdDeviation="8" floodOpacity="0.13" />
        </filter>
      </defs>

      <ArchitectureZone
        x={28}
        y={28}
        width={904}
        height={158}
        title="Request and compute"
        subtitle="Primary region · af-south-1"
      />
      <ArchitectureZone
        x={28}
        y={204}
        width={904}
        height={238}
        title="Workload-specific data paths"
        subtitle="Each subsystem scales according to its own traffic and consistency needs"
        tone="secondary"
      />
      <ArchitectureZone
        x={28}
        y={460}
        width={522}
        height={118}
        title="Operations"
        subtitle="Logs, metrics, alarms and system evidence"
        tone="operations"
      />
      <ArchitectureZone
        x={568}
        y={460}
        width={364}
        height={118}
        title="Disaster recovery"
        subtitle="Secondary region · eu-west-1"
        tone="recovery"
      />

      <g filter="url(#logihaul-node-shadow)">
        <ServiceNode x={48} y={78} width={126} badge="U" title="Users" subtitle="Web and mobile" tone="edge" />
        <ServiceNode x={214} y={78} width={174} badge="ALB" title="Load balancer" subtitle="Public traffic entry" tone="route" />
        <ServiceNode x={430} y={78} width={196} badge="ASG" title="Web application" subtitle="Auto Scaling compute" />
        <ServiceNode
          x={672}
          y={78}
          width={224}
          badge="λ"
          title="HTTP API + Lambda"
          subtitle="Elastic order intake"
          tone="serverless"
          emphasized
        />

        <ServiceNode
          x={48}
          y={270}
          width={184}
          badge="DDB"
          title="DynamoDB"
          subtitle="Orders and tracking writes"
          tone="data"
          emphasized
        />
        <ServiceNode x={264} y={270} width={184} badge="RDS" title="RDS MySQL" subtitle="Drivers and billing" tone="data" />
        <ServiceNode x={480} y={270} width={184} badge="EC" title="ElastiCache" subtitle="Hot tracking reads" tone="cache" />
        <ServiceNode x={696} y={270} width={184} badge="SQS" title="Amazon SQS" subtitle="Burst buffer" tone="event" />
        <ServiceNode x={480} y={358} width={184} badge="S3" title="Amazon S3" subtitle="Reports and evidence" tone="storage" />
        <ServiceNode x={696} y={358} width={184} badge="λ" title="Notification Lambda" subtitle="Email and SMS work" tone="event" />

        <ServiceNode x={70} y={500} width={214} badge="CW" title="Amazon CloudWatch" subtitle="Logs · metrics · alarms" tone="signal" />
        <ServiceNode x={306} y={500} width={214} badge="SNS" title="Operational alerts" subtitle="Alarm notification path" tone="signal" />
        <ServiceNode x={604} y={500} width={292} badge="S3" title="Cross-region S3 replica" subtitle="af-south-1 → eu-west-1" tone="recovery" />
      </g>

      <FlowPath d="M174 112 H214" markerId={markerId} />
      <FlowPath d="M388 112 H430" markerId={markerId} />
      <FlowPath d="M626 112 H672" markerId={markerId} />

      <FlowPath d="M784 146 V228 H140 V270" markerId={highlightMarkerId} highlight />
      <text className="architecture-flow-label architecture-flow-label--highlight" x="454" y="220">
        50× spike path
      </text>

      <FlowPath d="M528 146 V236 H356 V270" markerId={markerId} />
      <FlowPath d="M528 146 V236 H572 V270" markerId={markerId} />
      <FlowPath d="M784 146 V236 H788 V270" markerId={markerId} />
      <FlowPath d="M784 146 V244 H572 V358" markerId={markerId} muted />
      <FlowPath d="M788 338 V358" markerId={markerId} />

      <FlowPath d="M572 426 V466 H750 V500" markerId={markerId} />
      <FlowPath d="M470 442 V474 H177 V500" markerId={markerId} muted />
      <FlowPath d="M284 534 H306" markerId={markerId} />

      <g className="architecture-legend" transform="translate(592 221)">
        <rect width="302" height="31" rx="15.5" />
        <circle cx="18" cy="15.5" r="4" />
        <text x="31" y="20">Serverless order path scales independently from relational workloads</text>
      </g>
    </svg>
  )
}

function LogiHaulMobileDiagram() {
  const markerId = 'logihaul-arrow-mobile'
  const highlightMarkerId = 'logihaul-arrow-highlight-mobile'

  return (
    <svg
      className="architecture-diagram__mobile"
      viewBox="0 0 420 1110"
      role="img"
      aria-labelledby="logihaul-mobile-title logihaul-mobile-description"
    >
      <title id="logihaul-mobile-title">LogiHaul mobile architecture flow</title>
      <desc id="logihaul-mobile-description">
        A vertical mobile-friendly version of the LogiHaul architecture showing request, data,
        asynchronous processing, monitoring, and recovery paths.
      </desc>

      <defs>
        <ArrowMarker id={markerId} />
        <ArrowMarker id={highlightMarkerId} highlight />
      </defs>

      <ArchitectureZone x={18} y={18} width={384} height={316} title="Request path" subtitle="af-south-1" />
      <ArchitectureZone
        x={18}
        y={352}
        width={384}
        height={568}
        title="Workload paths"
        subtitle="Separated by scale and data model"
        tone="secondary"
      />
      <ArchitectureZone
        x={18}
        y={938}
        width={384}
        height={154}
        title="Operations and recovery"
        subtitle="Monitoring plus regional object copy"
        tone="operations"
      />

      <ServiceNode x={60} y={70} width={300} badge="U" title="Users" subtitle="Web and mobile" tone="edge" />
      <ServiceNode x={60} y={154} width={300} badge="ALB" title="Application Load Balancer" subtitle="Public traffic entry" tone="route" />
      <ServiceNode x={60} y={238} width={300} badge="ASG" title="Web application" subtitle="Auto Scaling compute" />

      <ServiceNode
        x={60}
        y={398}
        width={300}
        badge="λ"
        title="HTTP API + Lambda"
        subtitle="Elastic order intake"
        tone="serverless"
        emphasized
      />
      <ServiceNode
        x={60}
        y={490}
        width={300}
        badge="DDB"
        title="DynamoDB"
        subtitle="50× spike-sensitive orders"
        tone="data"
        emphasized
      />
      <ServiceNode x={60} y={582} width={300} badge="RDS" title="RDS MySQL" subtitle="Driver and billing records" tone="data" />
      <ServiceNode x={60} y={674} width={300} badge="EC" title="ElastiCache" subtitle="Hot tracking reads" tone="cache" />
      <ServiceNode x={60} y={766} width={142} badge="SQS" title="SQS" subtitle="Burst buffer" tone="event" />
      <ServiceNode x={218} y={766} width={142} badge="λ" title="Lambda" subtitle="Notifications" tone="event" />
      <ServiceNode x={60} y={850} width={300} badge="S3" title="Amazon S3" subtitle="Reports and operational evidence" tone="storage" />

      <ServiceNode x={36} y={982} width={168} badge="CW" title="CloudWatch" subtitle="Logs and alarms" tone="signal" />
      <ServiceNode x={216} y={982} width={168} badge="S3" title="S3 replica" subtitle="eu-west-1" tone="recovery" />

      <FlowPath d="M210 138 V154" markerId={markerId} />
      <FlowPath d="M210 222 V238" markerId={markerId} />
      <FlowPath d="M210 306 V398" markerId={markerId} />
      <FlowPath d="M210 466 V490" markerId={highlightMarkerId} highlight />
      <text className="architecture-flow-label architecture-flow-label--highlight" x="222" y="482">
        50× path
      </text>
      <FlowPath d="M210 558 V582" markerId={markerId} />
      <FlowPath d="M210 650 V674" markerId={markerId} />
      <FlowPath d="M210 742 V750 H131 V766" markerId={markerId} />
      <FlowPath d="M202 800 H218" markerId={markerId} />
      <FlowPath d="M289 834 V850" markerId={markerId} />
      <FlowPath d="M210 918 V950 H120 V982" markerId={markerId} muted />
      <FlowPath d="M210 918 V950 H300 V982" markerId={markerId} />
    </svg>
  )
}

function LogiHaulDiagram({ compact }) {
  return (
    <figure
      className={`architecture-diagram architecture-diagram--detailed ${
        compact ? 'architecture-diagram--compact' : ''
      }`}
    >
      <div className="architecture-diagram__toolbar">
        <span aria-hidden="true" className="window-dot window-dot--red" />
        <span aria-hidden="true" className="window-dot window-dot--amber" />
        <span aria-hidden="true" className="window-dot window-dot--green" />
        <strong>logihaul-reference-architecture.yml</strong>
        <span className="architecture-diagram__toolbar-status">Layered view</span>
      </div>
      <div className="architecture-diagram__canvas">
        <LogiHaulDesktopDiagram />
        <LogiHaulMobileDiagram />
      </div>
      <figcaption>
        Request, data, event, monitoring, and recovery paths are separated so the 50× order spike
        can scale without forcing every subsystem onto the same architecture.
      </figcaption>
    </figure>
  )
}

function GenericDiagram({ variant, compact }) {
  const nodes = genericNodePositions[variant] ?? genericNodePositions.fintrust
  const connections = genericPaths[variant] ?? genericPaths.fintrust

  return (
    <figure className={`architecture-diagram ${compact ? 'architecture-diagram--compact' : ''}`}>
      <div className="architecture-diagram__toolbar">
        <span aria-hidden="true" className="window-dot window-dot--red" />
        <span aria-hidden="true" className="window-dot window-dot--amber" />
        <span aria-hidden="true" className="window-dot window-dot--green" />
        <strong>{variant}-architecture.yml</strong>
      </div>
      <svg viewBox="0 0 700 240" role="img" aria-label={`${variant} cloud architecture preview`}>
        <defs>
          <filter id={`shadow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="6" floodOpacity="0.16" />
          </filter>
        </defs>
        {connections.map(([from, to]) => (
          <path
            className="architecture-diagram__path"
            d={linePath(nodes[from], nodes[to])}
            key={`${from}-${to}`}
          />
        ))}
        {nodes.map((node) => (
          <g
            className={`architecture-node architecture-node--${node.type}`}
            filter={`url(#shadow-${variant})`}
            key={node.label}
            transform={`translate(${node.x - 53} ${node.y - 22})`}
          >
            <rect width="106" height="44" rx="12" />
            <circle cx="14" cy="14" r="4" />
            <text x="53" y="27" textAnchor="middle">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption>
        {variant === 'fintrust' && 'Public load balancing with private application, database, and secret paths.'}
        {variant === 'novatech' && 'Private-origin delivery and keyless CI/CD identity through OIDC.'}
      </figcaption>
    </figure>
  )
}

export function ArchitectureDiagram({ variant, compact = false }) {
  if (variant === 'logihaul') return <LogiHaulDiagram compact={compact} />
  return <GenericDiagram variant={variant} compact={compact} />
}
