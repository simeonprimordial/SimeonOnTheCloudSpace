import { useEffect, useState } from 'react'
import {
  About,
  Contact,
  Hero,
  ProjectHighlights,
  ScrollProgress,
} from './components/HomeSections'
import { ProjectArchive } from './components/ProjectArchive'
import { SiteFooter, SiteHeader } from './components/SiteChrome'
import { registerCloudDeskPortfolio } from './data/clouddesk'
import { caseStudies } from './data/portfolio'
import { useDaypartTheme } from './hooks/useDaypartTheme'
import { getRoute } from './lib/routing'
import CaseStudyPage from './pages/CaseStudyPage'
import ProjectsPage from './pages/ProjectsPage'

registerCloudDeskPortfolio()

function HomePage() {
  const daypart = useDaypartTheme()

  return (
    <div
      className="site-shell portfolio-home"
      data-daypart={daypart.key}
      data-daypart-label={daypart.label}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollProgress />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <ProjectHighlights />
        <About />
        <ProjectArchive />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}

function App() {
  const [route, setRoute] = useState(() => getRoute())

  useEffect(() => {
    const onChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onChange)
    window.addEventListener('popstate', onChange)
    return () => {
      window.removeEventListener('hashchange', onChange)
      window.removeEventListener('popstate', onChange)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route.type, route.slug])

  if (route.type === 'case') {
    const project = caseStudies.find((item) => item.slug === route.slug)
    if (project) {
      return <CaseStudyPage project={project} />
    }
  }

  if (route.type === 'projects') {
    return <ProjectsPage />
  }

  return <HomePage />
}

export default App
