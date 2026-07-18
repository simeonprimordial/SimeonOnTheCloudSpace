const nodePositions = {
  logihaul: [
    { x: 62, y: 82, label: 'Users', type: 'edge' },
    { x: 194, y: 82, label: 'ALB', type: 'route' },
    { x: 330, y: 62, label: 'ASG', type: 'compute' },
    { x: 330, y: 145, label: 'API', type: 'compute' },
    { x: 480, y: 42, label: 'RDS', type: 'data' },
    { x: 480, y: 108, label: 'DynamoDB', type: 'data' },
    { x: 480, y: 174, label: 'SQS/Lambda', type: 'event' },
    { x: 612, y: 82, label: 'CloudWatch', type: 'signal' },
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
  logihaul: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [3, 6], [4, 7], [5, 7], [6, 7]],
  fintrust: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]],
  novatech: [[0, 1], [1, 2], [3, 4], [4, 5], [5, 2], [5, 6]],
}

function linePath(start, end) {
  const midpoint = (start.x + end.x) / 2
  return `M ${start.x} ${start.y} C ${midpoint} ${start.y}, ${midpoint} ${end.y}, ${end.x} ${end.y}`
}

export function ArchitectureDiagram({ variant, compact = false }) {
  const nodes = nodePositions[variant] ?? nodePositions.logihaul
  const connections = paths[variant] ?? paths.logihaul

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
        {variant === 'logihaul' && 'Independent scale paths for web, tracking, billing, events, and recovery.'}
        {variant === 'fintrust' && 'Public load balancing with private application, database, and secret paths.'}
        {variant === 'novatech' && 'Private-origin delivery and keyless CI/CD identity through OIDC.'}
      </figcaption>
    </figure>
  )
}
