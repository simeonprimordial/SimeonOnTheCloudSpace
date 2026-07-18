import {
  About,
  Contact,
  EngineeringJourney,
  Hero,
  LearningEducation,
  ProjectArchive,
  ProjectHighlights,
} from './components/HomeSections'
import { SiteFooter, SiteHeader } from './components/SiteChrome'
import { caseStudies } from './data/portfolio'
import CaseStudyPage from './pages/CaseStudyPage'

function HomePage() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <About />
        <ProjectHighlights />
        <EngineeringJourney />
        <LearningEducation />
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
