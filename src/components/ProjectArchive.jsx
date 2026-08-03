import { useEffect, useState } from 'react'
import { fallbackProjects, fetchGitHubProjects } from '../data/githubProjects'
import { ArrowIcon } from './Common'

const homepageProjectLimit = 7
const projectRotationInterval = 9000

function selectInitialProjects(projects) {
  return projects.slice(0, homepageProjectLimit)
}

function rotateOneProject(currentProjects, projectPool) {
  if (currentProjects.length === 0) return selectInitialProjects(projectPool)

  const visibleProjectNames = new Set(currentProjects.map((project) => project.name))
  const availableProjects = projectPool.filter(
    (project) => !visibleProjectNames.has(project.name),
  )

  if (availableProjects.length === 0) return currentProjects

  const replacement =
    availableProjects[Math.floor(Math.random() * availableProjects.length)]
  const replacementIndex = Math.floor(Math.random() * currentProjects.length)
  const nextProjects = [...currentProjects]

  nextProjects[replacementIndex] = replacement
  return nextProjects
}

export function ProjectArchive() {
  const [projectPool, setProjectPool] = useState(fallbackProjects)
  const [selectedProjects, setSelectedProjects] = useState(() =>
    selectInitialProjects(fallbackProjects),
  )
  const [rotationPaused, setRotationPaused] = useState(false)
  const [sourceStatus, setSourceStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    fetchGitHubProjects(controller.signal)
      .then((projects) => {
        setProjectPool(projects)
        setSelectedProjects(selectInitialProjects(projects))
        setSourceStatus('live')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setSourceStatus('fallback')
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (rotationPaused || projectPool.length <= homepageProjectLimit) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const rotationTimer = window.setInterval(() => {
      setSelectedProjects((currentProjects) =>
        rotateOneProject(currentProjects, projectPool),
      )
    }, projectRotationInterval)

    return () => window.clearInterval(rotationTimer)
  }, [projectPool, rotationPaused])

  return (
    <section
      className="clean-section clean-section--compact clean-section--bordered"
      id="more-work"
      onMouseEnter={() => setRotationPaused(true)}
      onMouseLeave={() => setRotationPaused(false)}
      onFocusCapture={() => setRotationPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setRotationPaused(false)
      }}
    >
      <div className="container">
        <div className="clean-section__heading clean-section__heading--compact">
          <div>
            <p className="clean-kicker">More work</p>
            <h2 className="clean-title clean-title--small">
              Seven projects rotating across the full portfolio.
            </h2>
            <p className="project-index__rotation-note">
              <span aria-hidden="true" />
              One project changes every nine seconds. Rotation pauses while you interact with this
              section.
            </p>
          </div>
          <a className="clean-text-link" href="?page=projects">
            Explore every project <ArrowIcon />
          </a>
        </div>

        <div className="project-index">
          {selectedProjects.map((project, index) => (
            <a
              className="project-index__row project-index__row--rotating motion-reveal motion-reveal--visible"
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} repository`}
              key={project.name}
            >
              <div className="project-index__number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <span>{project.type}</span>
                <h3>{project.title}</h3>
              </div>
              <p>{project.description}</p>
              <div className="project-index__arrow" aria-hidden="true">
                ↗
              </div>
            </a>
          ))}
        </div>

        <div className="project-index__more">
          <div>
            <p>Looking for a specific AWS service, tool, language, or engineering skill?</p>
            <span className="project-index__source-status">
              {sourceStatus === 'loading' && 'Refreshing the public project pool from GitHub…'}
              {sourceStatus === 'live' && 'Rotating from the live public GitHub project library.'}
              {sourceStatus === 'fallback' && 'Rotating from the cached public project library.'}
            </span>
          </div>
          <a className="clean-button clean-button--primary" href="?page=projects">
            Open the searchable project library <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
