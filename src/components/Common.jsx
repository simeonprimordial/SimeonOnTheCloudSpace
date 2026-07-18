export function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  )
}

export function MenuIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function SectionHeading({ index, title, description }) {
  return (
    <div className="section-heading">
      <div className="section-heading__index">{index}</div>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}

export function TechnologyList({ items }) {
  return (
    <div className="technology-list">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}

export function MetricGrid({ metrics, compact = false }) {
  return (
    <div className={`metric-grid ${compact ? 'metric-grid--compact' : ''}`}>
      {metrics.map((metric) => (
        <div className="metric-card" key={`${metric.value}-${metric.label}`}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  )
}
