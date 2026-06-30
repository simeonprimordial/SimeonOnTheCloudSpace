const groups = [
  {
    title: 'Cloud & Architecture',
    items: ['AWS (EC2, S3, RDS, VPC, IAM)', 'Solutions Architecture', 'Cost-aware infrastructure design', 'Fault-tolerant / event-driven systems'],
  },
  {
    title: 'Automation & Delivery',
    items: ['Terraform (IaC)', 'GitHub Actions (CI/CD)', 'Docker', 'Kubernetes'],
  },
  {
    title: 'Operations',
    items: ['Linux administration', 'Bash scripting', 'Cloud security hardening', 'Monitoring & observability'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12">
          <div className="font-mono text-xs text-amber uppercase tracking-wider mb-2.5">
            02 / Stack
          </div>
          <h2 className="font-display font-semibold text-[clamp(24px,3vw,32px)]">
            Tools I reach for
          </h2>
          <p className="text-text-dim mt-2.5 max-w-[60ch]">
            A working stack for designing, deploying, and operating cloud infrastructure end to end.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {groups.map((g) => (
            <div key={g.title} className="border border-line bg-surface rounded-xl p-5">
              <h3 className="font-display text-base mb-3.5 flex items-center gap-2">
                <span className="w-1.5 h-[18px] bg-amber rounded-sm inline-block" />
                {g.title}
              </h3>
              <ul>
                {g.items.map((item, i) => (
                  <li
                    key={item}
                    className={`font-mono text-[13px] text-text-dim py-1.5 ${i !== 0 ? 'border-t border-line' : ''}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
