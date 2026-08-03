const nodePositions = {
  clouddesk: [
    { x: 64, y: 104, label: 'API Client', type: 'edge' },
    { x: 180, y: 104, label: 'Cognito', type: 'identity' },
    { x: 306, y: 104, label: 'HTTP API', type: 'route' },
    { x: 432, y: 70, label: 'Lambda', type: 'compute' },
    { x: 432, y: 146, label: 'Shared Layer', type: 'compute' },
    { x: 570, y: 70, label: 'PostgreSQL', type: 'data' },
    { x: 570, y: 146, label: 'Secrets', type: 'identity' },
    { x: 282, y: 208, label: 'OIDC / STS', type: 'identity' },
    { x: 630, y: 208, label: 'CloudWatch', type: 'signal' },
  ],
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

const paths = {
  clouddesk: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [7, 3], [3, 8]],
  fintrust: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]],
  novatech: [[0, 1], [1, 2], [3, 4], [4, 5], [5, 2], [5, 6]],
}

function linePath(start, end) {
  const midpoint = (start.x + end.x) / 2
  return `M ${start.x} ${start.y} C ${midpoint} ${start.y}, ${midpoint} ${end.y}, ${end.x} ${end.y}`
}

function EnterpriseService({ x, y, width = 132, label, detail, tone = 'compute' }) {
  return (
    <g className={`enterprise-service enterprise-service--${tone}`} transform={`translate(${x} ${y})`}>
      <rect width={width} height="58" rx="10" />
      <text className="enterprise-service__label" x={width / 2} y="24" textAnchor="middle">
        {label}
      </text>
      <text className="enterprise-service__detail" x={width / 2} y="42" textAnchor="middle">
        {detail}
      </text>
    </g>
  )
}

function EnterpriseFlow({ d, markerId, emphasis = false, dashed = false }) {
  const classes = [
    'enterprise-flow',
    emphasis ? 'enterprise-flow--emphasis' : '',
    dashed ? 'enterprise-flow--dashed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return <path className={classes} d={d} markerEnd={`url(#${markerId})`} />
}

function LogiHaulEnterpriseDiagram({ compact }) {
  const markerId = 'logihaul-enterprise-arrow'
  const emphasisMarkerId = 'logihaul-enterprise-arrow-emphasis'

  return (
    <figure
      className={`architecture-diagram architecture-diagram--enterprise ${
        compact ? 'architecture-diagram--compact' : ''
      }`}
    >
      <div className="enterprise-diagram__header">
        <span>Enterprise AWS architecture</span>
        <strong>LogiHaul logistics platform</strong>
        <p>Highly available, event-driven design engineered for a 50× traffic spike.</p>
      </div>

      <svg
        className="enterprise-diagram__canvas"
        viewBox="0 0 980 620"
        role="img"
        aria-labelledby="logihaul-enterprise-title logihaul-enterprise-description"
      >
        <title id="logihaul-enterprise-title">LogiHaul enterprise AWS architecture</title>
        <desc id="logihaul-enterprise-description">
          Users enter through an Application Load Balancer. Auto Scaling EC2 serves the web
          application, while HTTP API and Lambda handle elastic order intake. DynamoDB stores orders
          and tracking events, RDS MySQL stores driver and billing records, ElastiCache serves hot
          tracking reads, SQS buffers bursts, Lambda and SNS deliver notifications, S3 stores reports
          and replicates from af-south-1 to eu-west-1, and CloudWatch provides observability.
        </desc>

        <defs>
          <marker id={markerId} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" />
          </marker>
          <marker
            id={emphasisMarkerId}
            markerWidth="9"
            markerHeight="9"
            refX="8"
            refY="4.5"
            orient="auto"
          >
            <path className="enterprise-marker--emphasis" d="M0,0 L9,4.5 L0,9 Z" />
          </marker>
        </defs>

        <rect className="enterprise-cloud" x="18" y="18" width="944" height="584" rx="20" />
        <text className="enterprise-cloud__label" x="42" y="50">
          AWS Cloud
        </text>

        <rect className="enterprise-region" x="42" y="72" width="694" height="500" rx="16" />
        <text className="enterprise-region__label" x="62" y="100">
          Primary Region · af-south-1
        </text>

        <rect className="enterprise-region enterprise-region--secondary" x="754" y="72" width="184" height="500" rx="16" />
        <text className="enterprise-region__label" x="774" y="100">
          DR · eu-west-1
        </text>

        <rect className="enterprise-zone" x="62" y="122" width="654" height="116" rx="12" />
        <text className="enterprise-zone__label" x="78" y="147">
          Traffic and compute · Multi-AZ
        </text>

        <rect className="enterprise-zone" x="62" y="256" width="654" height="150" rx="12" />
        <text className="enterprise-zone__label" x="78" y="281">
          Data services
        </text>

        <rect className="enterprise-zone" x="62" y="424" width="654" height="122" rx="12" />
        <text className="enterprise-zone__label" x="78" y="449">
          Integration, notifications and operations
        </text>

        <EnterpriseService x={80} y={164} width={108} label="Users" detail="Web · mobile" tone="edge" />
        <EnterpriseService x={218} y={164} width={118} label="ALB" detail="Public entry" tone="network" />
        <EnterpriseService x={366} y={164} width={142} label="EC2 Auto Scaling" detail="Web application" />
        <EnterpriseService x={538} y={164} width={158} label="HTTP API + Lambda" detail="Order intake" tone="serverless" />

        <EnterpriseService x={80} y={310} width={132} label="DynamoDB" detail="Orders · tracking" tone="database" />
        <EnterpriseService x={236} y={310} width={132} label="RDS MySQL" detail="Drivers · billing" tone="database" />
        <EnterpriseService x={392} y={310} width={132} label="ElastiCache" detail="Hot tracking reads" tone="cache" />
        <EnterpriseService x={548} y={310} width={148} label="Amazon S3" detail="Reports · evidence" tone="storage" />

        <EnterpriseService x={80} y={468} width={116} label="Amazon SQS" detail="Burst buffer" tone="integration" />
        <EnterpriseService x={220} y={468} width={142} label="Lambda" detail="Notifications" tone="serverless" />
        <EnterpriseService x={386} y={468} width={116} label="Amazon SNS" detail="Email · SMS" tone="integration" />
        <EnterpriseService x={526} y={468} width={170} label="CloudWatch" detail="Logs · metrics · alarms" tone="operations" />

        <EnterpriseService x={778} y={285} width={136} label="Amazon S3" detail="Cross-region replica" tone="storage" />
        <text className="enterprise-note" x="846" y="370" textAnchor="middle">
          Versioned recovery copy
        </text>

        <EnterpriseFlow d="M188 193 H218" markerId={markerId} />
        <EnterpriseFlow d="M336 193 H366" markerId={markerId} />
        <EnterpriseFlow d="M336 184 C420 110 530 110 617 164" markerId={markerId} />

        <EnterpriseFlow d="M617 222 V270 H146 V310" markerId={emphasisMarkerId} emphasis />
        <EnterpriseFlow d="M617 222 V286 H138 V468" markerId={emphasisMarkerId} emphasis />
        <text className="enterprise-spike-label" x="413" y="264">
          50× spike path
        </text>

        <EnterpriseFlow d="M437 222 V292 H302 V310" markerId={markerId} />
        <EnterpriseFlow d="M437 222 V284 H458 V310" markerId={markerId} />
        <EnterpriseFlow d="M437 222 V274 H622 V310" markerId={markerId} />

        <EnterpriseFlow d="M196 497 H220" markerId={markerId} />
        <EnterpriseFlow d="M362 497 H386" markerId={markerId} />
        <EnterpriseFlow d="M696 339 H754" markerId={markerId} dashed />

        <EnterpriseFlow d="M302 368 V430 H611 V468" markerId={markerId} dashed />
        <EnterpriseFlow d="M458 368 V418 H611 V468" markerId={markerId} dashed />
        <EnterpriseFlow d="M617 222 V410 H611 V468" markerId={markerId} dashed />

        <text className="enterprise-flow-note" x="735" y="328">
          S3 Cross-Region Replication
        </text>
        <text className="enterprise-flow-note" x="466" y="414">
          Metrics and logs
        </text>
      </svg>

      <figcaption>
        Independent scale paths separate web traffic, order intake, relational workloads,
        asynchronous notifications, observability, and disaster recovery.
      </figcaption>
    </figure>
  )
}

export function ArchitectureDiagram({ variant, compact = false }) {
  if (variant === 'logihaul') {
    return <LogiHaulEnterpriseDiagram compact={compact} />
  }

  const nodes = nodePositions[variant] ?? nodePositions.fintrust
  const connections = paths[variant] ?? paths.fintrust

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
          <path className="architecture-diagram__path" d={linePath(nodes[from], nodes[to])} key={`${from}-${to}`} />
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
            <text x="53" y="27" textAnchor="middle">{node.label}</text>
          </g>
        ))}
      </svg>
      <figcaption>
        {variant === 'clouddesk' && 'Cognito-protected serverless APIs with tenant authorization, private data access, keyless deployment, and CloudWatch observability.'}
        {variant === 'fintrust' && 'Public load balancing with private application, database, and secret paths.'}
        {variant === 'novatech' && 'Private-origin delivery and keyless CI/CD identity through OIDC.'}
      </figcaption>
    </figure>
  )
}
