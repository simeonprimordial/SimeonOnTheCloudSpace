import {
  About,
  Contact,
  Hero,
  ProjectArchive,
  ProjectHighlights,
  ScrollProgress,
} from './components/HomeSections'
import { SiteFooter, SiteHeader } from './components/SiteChrome'
import { caseStudies } from './data/portfolio'
import CaseStudyPage from './pages/CaseStudyPage'

function HomePage() {
  return (
    <div className="site-shell portfolio-home">
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
  const slug = new URLSearchParams(window.location.search).get('case')
  const project = caseStudies.find((item) => item.slug === slug)

  if (project) {
    return <CaseStudyPage project={project} />
  }

  return <HomePage />
}

export default App
