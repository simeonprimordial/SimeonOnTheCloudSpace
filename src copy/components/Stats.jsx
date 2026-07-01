import { useEffect, useRef, useState } from 'react'

const stats = [
  { end: 2, suffix: '+', label: 'Years hands-on with AWS' },
  { end: 4, suffix: '', label: 'Infrastructure projects shipped' },
  { end: 1, suffix: '', label: 'AWS certification in progress' },
  { end: 100, suffix: '%', label: 'Terraform-managed deployments' },
]

function useCountUp(end, active, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime = null
    let frame

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [active, end, duration])

  return value
}

function StatItem({ end, suffix, label, active }) {
  const value = useCountUp(end, active)
  return (
    <div className="text-center md:text-left">
      <div className="font-display font-bold text-4xl sm:text-5xl text-amber tabular-nums">
        {value}
        {suffix}
      </div>
      <div className="text-text-dim text-sm mt-2 max-w-[20ch] mx-auto md:mx-0">{label}</div>
    </div>
  )
}

export default function Stats() {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 px-6 border-y border-line bg-surface/40">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} active={active} />
        ))}
      </div>
    </section>
  )
}
