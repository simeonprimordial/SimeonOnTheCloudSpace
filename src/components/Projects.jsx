const projects = [
  {
    tag: 'reference architecture',
    name: 'logihaul-reference-architecture',
    desc: 'AWS reference architecture for a high-throughput logistics workload, designed for scalability, fault tolerance, and event-driven processing.',
    url: 'https://github.com/simeonprimordial/logihaul-reference-architecture',
  },
  {
    tag: 'production system',
    name: 'lagos-lawfirm-s3-dms',
    desc: 'Secure cloud document management system on Amazon S3 for a law firm, with encrypted storage, lifecycle-managed archiving, and pre-signed URL access.',
    url: 'https://github.com/simeonprimordial/lagos-lawfirm-s3-dms',
  },
  {
    tag: 'certification prep',
    name: 'aws-solutions-architect-associate-saac03',
    desc: 'Hands-on projects and notes from AWS Solutions Architect Associate (SAA-C03) certification preparation.',
    url: 'https://github.com/simeonprimordial/aws-solutions-architect-associate-saac03',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12">
          <div className="font-mono text-xs text-amber uppercase tracking-wider mb-2.5">
            03 / Selected work
          </div>
          <h2 className="font-display font-semibold text-[clamp(24px,3vw,32px)]">
            Featured projects
          </h2>
          <p className="text-text-dim mt-2.5 max-w-[60ch]">
            A sample of recent infrastructure and architecture work.
          </p>
        </div>

        <div className="flex flex-col gap-px bg-line border border-line rounded-xl overflow-hidden">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface hover:bg-surface-2 transition-colors p-7 grid grid-cols-1 sm:grid-cols-[200px_1fr_auto] sm:items-center gap-3.5 sm:gap-6"
            >
              <span className="font-mono text-[11px] text-green border border-line inline-block px-2.5 py-1 rounded-full w-fit">
                {p.tag}
              </span>
              <div>
                <h3 className="font-display text-lg mb-1.5">{p.name}</h3>
                <p className="text-text-dim text-[14.5px] max-w-[60ch]">{p.desc}</p>
              </div>
              <span className="text-amber text-xl justify-self-end hidden sm:block">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
