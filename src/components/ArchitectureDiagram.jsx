const nodes = [
  { id: 'dns', x: 30, y: 20, w: 80, h: 30, label: 'Route 53', delay: '0.1s' },
  { id: 'alb', x: 30, y: 95, w: 80, h: 30, label: 'ALB', delay: '0.35s' },
  { id: 'compute', x: 110, y: 95, w: 80, h: 30, label: 'EC2 / ECS', delay: '0.6s' },
  { id: 'db', x: 110, y: 155, w: 80, h: 30, label: 'RDS', delay: '0.85s' },
  { id: 's3', x: 220, y: 95, w: 80, h: 30, label: 'S3', delay: '1.1s' },
  { id: 'cw', x: 220, y: 155, w: 80, h: 30, label: 'CloudWatch', delay: '1.1s' },
]

const edges = [
  { d: 'M70,50 L70,110', delay: '0.3s' },
  { d: 'M70,110 L150,110', delay: '0.55s' },
  { d: 'M150,110 L150,170', delay: '0.8s' },
  { d: 'M150,170 L260,170', delay: '1.05s' },
  { d: 'M150,110 L260,110', delay: '0.55s' },
]

export default function ArchitectureDiagram() {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6">
      <div className="font-mono text-[11px] text-text-dim flex justify-between mb-3.5">
        <span>// reference-architecture.yaml</span>
        <span>region: us-east-1</span>
      </div>

      <svg viewBox="0 0 380 220" className="w-full h-auto block" aria-label="Animated AWS reference architecture diagram">
        {edges.map((e, i) => (
          <g key={i}>
            <path
              d={e.d}
              className="edge-anim"
              style={{ animationDelay: e.delay, stroke: 'var(--color-line)', strokeWidth: 1.5, fill: 'none' }}
            />
            <path
              d={e.d}
              className="edge-anim edge-flow"
              style={{
                animationDelay: e.delay,
                stroke: 'var(--color-amber)',
                strokeWidth: 2,
                fill: 'none',
                strokeDasharray: '6 10',
              }}
            />
          </g>
        ))}

        {nodes.map((n) => (
          <g key={n.id} className="node-anim" style={{ animationDelay: n.delay }}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx="6"
              style={{ fill: 'var(--color-surface-2)', stroke: 'var(--color-line)', strokeWidth: 1.5 }}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + n.h / 2 + 4}
              textAnchor="middle"
              className="font-mono"
              style={{ fontSize: '10.5px', fill: 'var(--color-text-dim)' }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="font-mono text-[11px] text-text-dim flex justify-between mt-3.5">
        <span style={{ color: 'var(--color-green)' }}>● healthy</span>
        <span>uptime 99.97%</span>
      </div>
    </div>
  )
}
