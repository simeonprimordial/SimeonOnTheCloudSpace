import { archiveProjects } from '../data/portfolio'
import { ArrowIcon } from './Common'

const homepageProjectLimit = 7

export function ProjectArchive() {
  const selectedProjects = archiveProjects
    .filter((project) => !project.caseStudySlug)
    .slice(0, homepageProjectLimit)

  return (
    <section className="clean-section clean-section--compact clean-section--bordered" id="more-work">
      <div className="container">
        <div className="clean-section__heading clean-section__heading--compact">
          <div>
            <p className="clean-kicker">More work</p>
            <h2 className="clean-title clean-title--small">Seven selected cloud projects.</h2>
          </div>
          <a className="clean-text-link" href="?page=projects">
            Explore every project <ArrowIcon />
          </a>
        </div>

        <div className="project-index">
          {selectedProjects.map((project, index) => (
            <a
              className="project-index__row motion-reveal motion-reveal--visible"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              key={project.name}
            >
              <div className="project-index__number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <span>{project.type}</span>
                <h3>{project.name}</h3>
              </div>
              <p>{project.description}</p>
              <div className="project-index__arrow" aria-hidden="true">
                ↗
              </div>
            </a>
          ))}
        </div>

        <div className="project-index__more">
          <p>Looking for a specific AWS service, tool, language, or engineering skill?</p>
          <a className="clean-button clean-button--primary" href="?page=projects">
            Open the searchable project library <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
