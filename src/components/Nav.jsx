import { useState } from 'react'

const BASE = import.meta.env.BASE_URL

export default function Nav() {
  const [imgSrc, setImgSrc] = useState(`${BASE}images/profile.jpg`)

  const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur-md border-b border-line">
      <nav className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-display font-bold text-lg flex items-center gap-2.5">
          <img
            src={imgSrc}
            onError={() => setImgSrc(`${BASE}images/avatar-placeholder.svg`)}
            alt=""
            aria-hidden="true"
            className="w-7 h-7 rounded-full object-cover border border-line"
          />
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
