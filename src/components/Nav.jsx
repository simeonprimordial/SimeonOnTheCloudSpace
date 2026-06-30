export default function Nav() {
  const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur-md border-b border-line">
      <nav className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-display font-bold text-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green led-pulse shadow-[0_0_8px_var(--color-green)]" />
          Simeon Siaka
        </a>
        <div className="hidden sm:flex gap-8 text-sm text-text-dim">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-text transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="border border-line hover:border-amber rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5"
        >
          Get in touch
        </a>
      </nav>
    </header>
  )
}
