import { useEffect, useMemo, useState } from 'react'
import { ArrowIcon } from '../components/Common'
import { ScrollProgress } from '../components/HomeSections'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import {
  fallbackProjects,
  fetchGitHubProjects,
  quickProjectFilters,
} from '../data/githubProjects'
import { useDaypartTheme } from '../hooks/useDaypartTheme'

function searchableProjectText(project) {
  return [
    project.title,
    project.name,
    project.type,
    project.description,
    project.language,
    ...project.skills,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function matchesQuickFilter(project, filter) {
  if (filter === 'All') return true

  const searchable = searchableProjectText(project)
  const aliases = {
    AWS: ['aws', 'amazon', 'cloudfront', 'lambda', 'cognito', 'ec2', 'rds', 's3'],
    Serverless: ['serverless', 'lambda', 'api gateway', 'aws sam'],
    Security: ['security', 'iam', 'oidc', 'secret', 'encryption', 'cognito', 'jwt'],
    'CI/CD': ['ci/cd', 'github actions', 'pipeline', 'oidc'],
  }
  const terms = aliases[filter] || [filter.toLowerCase()]

  return terms.some((term) => searchable.includes(term.toLowerCase()))
}

function formatUpdatedDate(value) {
  if (!value) return 'Documented project'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-library-card">
      <div className="project-library-card__meta">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{project.type}</span>
      </div>

      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <div className="project-library-card__skills" aria-label={`${project.title} tools and skills`}>
        {project.skills.slice(0, 8).map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="project-library-card__footer">
        <div>
          {project.language && <span>{project.language}</span>}
          <span>Updated {formatUpdatedDate(project.updatedAt)}</span>
        </div>
        <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
          View repository <ArrowIcon />
        </a>
      </div>
    </article>
  )
}

export default function ProjectsPage() {
  const daypart = useDaypartTheme()
  const [projects, setProjects] = useState(fallbackProjects)
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('relevance')
  const [sourceStatus, setSourceStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()
    const originalTitle = document.title

    document.title = 'Projects — Simeon Siaka | Cloud Infrastructure & DevOps'

    fetchGitHubProjects(controller.signal)
      .then((repositories) => {
        setProjects(repositories)
        setSourceStatus('live')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setSourceStatus('fallback')
      })

    return () => {
      controller.abort()
      document.title = originalTitle
    }
  }, [])

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = projects.filter((project) => {
      const matchesSearch =
        normalizedQuery.length === 0 || searchableProjectText(project).includes(normalizedQuery)

      return matchesSearch && matchesQuickFilter(project, activeFilter)
    })

    return [...filtered].sort((first, second) => {
      if (sortOrder === 'updated') {
        return Date.parse(second.updatedAt || '') - Date.parse(first.updatedAt || '')
      }

      if (sortOrder === 'alphabetical') {
        return first.title.localeCompare(second.title)
      }

      return second.relevance - first.relevance
    })
  }, [activeFilter, projects, query, sortOrder])

  return (
    <div
      className="site-shell portfolio-home project-library-page"
      data-daypart={daypart.key}
      data-daypart-label={daypart.label}
    >
      <a className="skip-link" href="#project-results">
        Skip to projects
      </a>
      <ScrollProgress />
      <SiteHeader caseStudy />

      <main>
        <section className="project-library-hero" id="top">
          <div className="container project-library-hero__inner">
            <div>
              <p className="clean-kicker clean-kicker--light">Project library</p>
              <h1>Cloud Engineering Project Library</h1>
            </div>
            <div className="project-library-hero__copy">
              <p>
                Public GitHub projects indexed by engineering relevance and searchable by AWS
                service, tool, language, platform, and skill.
              </p>
              <a href="./#more-work">
                Back to selected projects <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section className="project-library-controls" aria-label="Project search and filters">
          <div className="container">
            <label className="project-search" htmlFor="project-search-input">
              <span>Tools and skills</span>
              <input
                id="project-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Terraform, Cognito, Docker, Linux, security..."
                autoComplete="off"
              />
            </label>

            <div className="project-library-controls__row">
              <div className="project-filter-list" aria-label="Quick project filters">
                {quickProjectFilters.map((filter) => (
                  <button
                    className={activeFilter === filter ? 'is-active' : ''}
                    type="button"
                    aria-pressed={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                    key={filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <label className="project-sort" htmlFor="project-sort-select">
                <span>Sort</span>
                <select
                  id="project-sort-select"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                >
                  <option value="relevance">Engineering relevance</option>
                  <option value="updated">Recently updated</option>
                  <option value="alphabetical">Project name</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <section className="project-library-results" id="project-results">
          <div className="container">
            <div className="project-library-results__summary" aria-live="polite">
              <p>
                <strong>{visibleProjects.length}</strong>{' '}
                {visibleProjects.length === 1 ? 'project' : 'projects'} found
              </p>
              <span>
                {sourceStatus === 'loading' && 'Refreshing repository data from GitHub…'}
                {sourceStatus === 'live' && 'Repository information loaded from GitHub.'}
                {sourceStatus === 'fallback' && 'Showing the cached public project index.'}
              </span>
            </div>

            {visibleProjects.length > 0 ? (
              <div className="project-library-grid">
                {visibleProjects.map((project, index) => (
                  <ProjectCard project={project} index={index} key={project.name} />
                ))}
              </div>
            ) : (
              <div className="project-library-empty">
                <p className="clean-kicker">No matching projects</p>
                <h2>No Projects Match the Current Filters</h2>
                <p>Search examples: AWS, Terraform, serverless, Docker, Linux, security, or CI/CD.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setActiveFilter('All')
                  }}
                >
                  Clear search and filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
