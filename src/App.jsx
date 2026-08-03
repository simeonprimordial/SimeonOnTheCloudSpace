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
  const searchParams = new URLSearchParams(window.location.search)
  const slug = searchParams.get('case')
  const page = searchParams.get('page')
  const project = caseStudies.find((item) => item.slug === slug)

  if (project) {
    return <CaseStudyPage project={project} />
  }

  if (page === 'projects') {
    return <ProjectsPage />
  }

  return <HomePage />
}

export default App
