import HeroIllustration from './HeroIllustration'
import Profile from './Profile'

export default function Hero() {
  return (
    <section id="top" className="pt-24 pb-20 px-6">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <Profile />

          <div className="inline-flex items-center gap-2 font-mono text-xs text-green border border-line bg-surface px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            Available for cloud / DevOps roles
          </div>

          <h1 className="font-display font-bold text-[clamp(34px,5vw,54px)] leading-[1.08] tracking-tight mb-5">
            Building infrastructure that stays <span className="text-amber">up</span> when it matters.
          </h1>

          <p className="text-text-dim text-lg max-w-[48ch] mb-8">
            I'm a cloud infrastructure engineer who designs secure, fault-tolerant systems on
            AWS — from reference architectures to production deployments — with an eye on
            scalability, cost, and operational simplicity.
          </p>

          <div className="flex flex-wrap gap-3.5">
            <a
              href="#projects"
              className="bg-amber text-[#1A1304] font-semibold text-sm px-5 py-3 rounded-lg hover:-translate-y-0.5 hover:bg-[#ffc163] transition-all"
            >
              View projects
            </a>
            <a
              href="https://github.com/simeonprimordial"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line font-semibold text-sm px-5 py-3 rounded-lg hover:-translate-y-0.5 hover:border-amber transition-all"
            >
              GitHub →
            </a>
          </div>
        </div>

        <HeroIllustration />
      </div>
    </section>
  )
}
