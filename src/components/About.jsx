import ArchitectureDiagram from './ArchitectureDiagram'

export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10">
        <div>
          <div className="font-mono text-xs text-amber uppercase tracking-wider mb-2.5">
            01 / About
          </div>
          <h2 className="font-display font-semibold text-[clamp(24px,3vw,32px)] mb-4">
            I design for the failure case, not just the happy path.
          </h2>
          <p className="text-text-dim max-w-[62ch] mb-4">
            My focus is cloud architecture, infrastructure automation, DevOps practices,
            observability, security, and performance optimization. I enjoy translating
            business requirements into reliable technical solutions that scale efficiently
            while staying operationally simple.
          </p>
          <p className="text-text-dim max-w-[62ch]">
            I'm continuously expanding my expertise through hands-on projects, architecture
            design exercises, and cloud engineering challenges — and I'm currently studying
            for the AWS Solutions Architect Associate (SAA-C03) certification.
          </p>
        </div>

        <ArchitectureDiagram />
      </div>
    </section>
  )
}
