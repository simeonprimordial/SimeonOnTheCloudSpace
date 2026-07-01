export default function Contact() {
  return (
    <>
      <section id="contact" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-gradient-to-br from-surface to-surface-2 border border-line rounded-2xl p-10 sm:p-14 text-center">
            <h2 className="font-display font-semibold text-[clamp(24px,3vw,32px)] mb-3.5">
              Let's build something reliable.
            </h2>
            <p className="text-text-dim mb-7 max-w-[50ch] mx-auto">
              Open to cloud and DevOps roles, and always happy to talk infrastructure,
              architecture, or AWS.
            </p>
            <div className="flex justify-center flex-wrap gap-3.5">
              <a
                href="mailto:simeonvault@gmail.com"
                className="bg-amber text-[#1A1304] font-semibold text-sm px-5 py-3 rounded-lg hover:-translate-y-0.5 hover:bg-[#ffc163] transition-all"
              >
                Email me
              </a>
              <a
                href="https://www.linkedin.com/in/simeon-siaka-8a8367312/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line font-semibold text-sm px-5 py-3 rounded-lg hover:-translate-y-0.5 hover:border-amber transition-all"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/simeonprimordial"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line font-semibold text-sm px-5 py-3 rounded-lg hover:-translate-y-0.5 hover:border-amber transition-all"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-7 text-center text-text-dim text-sm border-t border-line">
        © {new Date().getFullYear()} Simeon Siaka. Built with AWS in mind.
      </footer>
    </>
  )
}
