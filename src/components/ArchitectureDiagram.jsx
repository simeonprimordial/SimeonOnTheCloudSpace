const nodePositions = {
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

function LogiHaulMobileDiagram() {
  const markerId = 'logihaul-enterprise-arrow-mobile'
  const emphasisMarkerId = 'logihaul-enterprise-arrow-emphasis-mobile'

  return (
    <svg
      className="enterprise-diagram__canvas enterprise-diagram__canvas--mobile"
      viewBox="0 0 420 1240"
      role="img"
      aria-labelledby="logihaul-mobile-title logihaul-mobile-description"
    >
      <title id="logihaul-mobile-title">LogiHaul mobile enterprise AWS architecture</title>
      <desc id="logihaul-mobile-description">
        A vertically arranged mobile view of the LogiHaul AWS architecture, including traffic,
        compute, data, asynchronous processing, monitoring, and disaster recovery.
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

      <rect className="enterprise-cloud" x="10" y="10" width="400" height="1220" rx="18" />
      <text className="enterprise-cloud__label" x="28" y="40">
        AWS Cloud
      </text>

      <rect className="enterprise-region" x="24" y="52" width="372" height="995" rx="15" />
      <text className="enterprise-region__label" x="42" y="78">
        Primary Region · af-south-1
      </text>

      <rect className="enterprise-zone" x="40" y="94" width="340" height="294" rx="12" />
      <text className="enterprise-zone__label" x="56" y="120">
        Traffic and compute · Multi-AZ
      </text>

      <EnterpriseService x={60} y={140} width={300} label="Users" detail="Web · mobile" tone="edge" />
      <EnterpriseService x={60} y={220} width={300} label="Application Load Balancer" detail="Public traffic entry" tone="network" />
      <EnterpriseService x={50} y={310} width={145} label="EC2 Auto Scaling" detail="Web application" />
      <EnterpriseService x={225} y={310} width={145} label="HTTP API + Lambda" detail="Order intake" tone="serverless" />

      <rect className="enterprise-zone" x="40" y="410" width="340" height="330" rx="12" />
      <text className="enterprise-zone__label" x="56" y="436">
        Data services
      </text>

      <EnterpriseService x={50} y={475} width={145} label="RDS MySQL" detail="Drivers · billing" tone="database" />
      <EnterpriseService x={225} y={475} width={145} label="DynamoDB" detail="Orders · tracking" tone="database" />
      <EnterpriseService x={50} y={570} width={145} label="ElastiCache" detail="Hot tracking reads" tone="cache" />
      <EnterpriseService x={50} y={665} width={145} label="Amazon S3" detail="Reports · evidence" tone="storage" />

      <rect className="enterprise-zone" x="40" y="762" width="340" height="285" rx="12" />
      <text className="enterprise-zone__label" x="56" y="788">
        Integration and operations
      </text>

      <EnterpriseService x={225} y={810} width={145} label="Amazon SQS" detail="Burst buffer" tone="integration" />
      <EnterpriseService x={50} y={895} width={145} label="CloudWatch" detail="Logs · metrics · alarms" tone="operations" />
      <EnterpriseService x={225} y={895} width={145} label="Lambda" detail="Notifications" tone="serverless" />
      <EnterpriseService x={225} y={975} width={145} label="Amazon SNS" detail="Email · SMS" tone="integration" />

      <rect className="enterprise-region enterprise-region--secondary" x="24" y="1070" width="372" height="145" rx="15" />
      <text className="enterprise-region__label" x="42" y="1097">
        Disaster recovery · eu-west-1
      </text>
      <EnterpriseService x={60} y={1120} width={300} label="Amazon S3" detail="Cross-region replica" tone="storage" />
      <text className="enterprise-note" x="210" y="1196" textAnchor="middle">
        Versioned recovery copy
      </text>

      <EnterpriseFlow d="M210 198 V220" markerId={markerId} />
      <EnterpriseFlow d="M210 278 V292 H122 V310" markerId={markerId} />
      <EnterpriseFlow d="M210 278 V292 H297 V310" markerId={markerId} />

      <EnterpriseFlow d="M122 368 V475" markerId={markerId} />
      <EnterpriseFlow d="M50 339 H28 V599 H50" markerId={markerId} />
      <EnterpriseFlow d="M50 339 H22 V694 H50" markerId={markerId} />

      <EnterpriseFlow d="M297 368 V475" markerId={emphasisMarkerId} emphasis />
      <text className="enterprise-spike-label" x="305" y="438">
        50× spike path
      </text>
      <EnterpriseFlow d="M297 533 V810" markerId={emphasisMarkerId} emphasis />
      <EnterpriseFlow d="M297 868 V895" markerId={markerId} />
      <EnterpriseFlow d="M297 953 V975" markerId={markerId} />

      <EnterpriseFlow d="M50 504 H24 V924 H50" markerId={markerId} dashed />
      <EnterpriseFlow d="M225 339 H205 V924 H195" markerId={markerId} dashed />
      <text className="enterprise-flow-note" x="58" y="878">
        Observability
      </text>

      <EnterpriseFlow d="M50 694 H18 V1098 H210 V1120" markerId={markerId} dashed />
      <text className="enterprise-flow-note" x="32" y="1060">
        S3 CRR
      </text>
    </svg>
  )
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
        className="enterprise-diagram__canvas enterprise-diagram__canvas--desktop"
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

      <LogiHaulMobileDiagram />

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
        {variant === 'fintrust' && 'Public load balancing with private application, database, and secret paths.'}
        {variant === 'novatech' && 'Private-origin delivery and keyless CI/CD identity through OIDC.'}
      </figcaption>
    </figure>
  )
}
