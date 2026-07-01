const steps = [
  {
    num: '01',
    title: 'Assess',
    desc: 'Understand the workload, traffic patterns, compliance needs, and failure points before touching any infrastructure.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Architect for the failure case first — fault tolerance, scaling limits, and cost boundaries are decided up front, not patched in later.',
  },
  {
    num: '03',
    title: 'Automate',
    desc: 'Codify everything in Terraform and CI/CD pipelines so environments are reproducible and deployments are boring.',
  },
  {
    num: '04',
    title: 'Monitor',
    desc: 'Wire up observability and alerting so issues surface before they become incidents, not after.',
  },
]

export default function WorkProcess() {
  return (
    <section id="process" className="py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12">
          <div className="font-mono text-xs text-amber uppercase tracking-wider mb-2.5">
            How I work
          </div>
          <h2 className="font-display font-semibold text-[clamp(24px,3vw,32px)]">
            My approach to an infrastructure project
          </h2>
          <p className="text-text-dim mt-2.5 max-w-[60ch]">
            The same four-step loop, whether it's a reference architecture or a client system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.num} className="relative border border-line bg-surface rounded-xl p-6">
              <div className="font-mono text-xs text-text-dim mb-4">{s.num}</div>
              <h3 className="font-display text-lg mb-2.5">{s.title}</h3>
              <p className="text-text-dim text-[13.5px] leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <span className="hidden lg:block absolute top-1/2 -right-3 text-amber text-lg -translate-y-1/2">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
