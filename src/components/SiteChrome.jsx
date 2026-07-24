import { useState } from 'react'
import { MenuIcon } from './Common'

const navigation = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#more-work', label: 'More work' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader({ caseStudy = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const homeHref = caseStudy ? './' : '#top'
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Primary navigation">
        <a className="brand" href={homeHref} onClick={closeMenu}>
          <span className="brand__monogram">S</span>
          <span className="brand__copy">
            <strong>Simeon Siaka</strong>
            <small>Cloud Infrastructure &amp; DevOps</small>
          </span>
        </a>

        {!caseStudy && (
          <div className="nav__links">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        )}

        {caseStudy && (
          <a className="nav__back" href="./#projects">
            Back to portfolio
          </a>
        )}

        <a
          className="nav__resume"
          href={`${import.meta.env.BASE_URL}Simeon-Siaka-Cloud-Infrastructure-CV.pdf`}
          download
        >
          Download CV
        </a>

        {!caseStudy && (
          <button
            className="nav__menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        )}
      </nav>

      {!caseStudy && (
        <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}>
          {navigation.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a
            href={`${import.meta.env.BASE_URL}Simeon-Siaka-Cloud-Infrastructure-CV.pdf`}
            download
            onClick={closeMenu}
          >
            Download CV
          </a>
        </div>
      )}
    </header>
  )
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <strong>Simeon Siaka</strong>
          <span>Cloud Infrastructure &amp; DevOps Engineering</span>
        </div>
        <p>© {currentYear} Simeon on the Cloud</p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
