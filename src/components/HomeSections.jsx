import { useMemo, useState } from 'react'
import {
  archiveProjects,
  caseStudies,
  journey,
  learning,
  professionalSummary,
  skillGroups,
} from '../data/portfolio'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { ArrowIcon, MetricGrid, SectionHeading, TechnologyList } from './Common'

function caseStudyHref(slug) {
  return `?case=${encodeURIComponent(slug)}`
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__orb hero__orb--one" aria-hidden="true" />
      <div className="hero__orb hero__orb--two" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Simeon on the Cloud · Nigeria</p>
          <h1>
            Building cloud infrastructure with
            <span> clarity, security, and evidence.</span>
          </h1>
          <p className="hero__intro">
            I design and document AWS systems, automate infrastructure with Terraform, and build
            delivery paths that reduce manual configuration and credential risk.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#highlights">
              View project highlights <ArrowIcon />
            </a>
            <a
              className="button button--secondary"
              href={`${import.meta.env.BASE_URL}Simeon-Siaka-Cloud-Infrastructure-CV.pdf`}
              download
            >
              Download CV
            </a>
            <a
              className="button button--text"
              href="https://github.com/simeonprimordial"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub profile <ArrowIcon />
            </a>
          </div>
          <div className="hero__status">
            <span className="status-dot" aria-hidden="true" />
            Open to cloud infrastructure and DevOps opportunities
          </div>
        </div>

        <div className="portrait-card">
          <div className="portrait-card__frame">
            <img
              src="https://avatars.githubusercontent.com/u/263141357?v=4"
              alt="Simeon Siaka"
            />
            <div className="portrait-card__label">
              <span>Current focus</span>
              <strong>AWS · Terraform · CI/CD</strong>
            </div>
          </div>
          <div className="portrait-card__note">
            <span>01</span>
            <p>From architecture diagrams to reproducible, reviewable infrastructure.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-layout">
        <SectionHeading
          index="About"
          title="I treat every portfolio project as an engineering record."
          description="The goal is not only to make a system work, but to show why it was designed that way, how it is deployed, and what happens when something fails."
        />

        <div className="professional-summary">
          <span>Professional summary</span>
          <p>{professionalSummary}</p>
        </div>

        <div className="about-copy">
          <p>
            My work focuses on secure AWS architecture, repeatable infrastructure, automated
            delivery, and documentation that another engineer can actually use. I am building
            depth across networking, identity, compute, storage, databases, containers, and
            observability.
          </p>
          <p>
            A physics background shapes how I approach cloud systems: define the constraints,
            model the behavior, test assumptions, and make the trade-offs visible.
          </p>
        </div>

        <div className="background-grid">
          <article>
            <span>Background</span>
            <h3>Physics graduate</h3>
            <p>
              Quantitative reasoning and structured problem solving applied to infrastructure
              engineering.
            </p>
          </article>
          <article>
            <span>Direction</span>
            <h3>Cloud Infrastructure → DevOps Engineering</h3>
            <p>
              A focused progression from AWS foundations into reliable delivery and operational
              systems.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export function ProjectHighlights() {
  return (
    <section className="section highlights-section" id="highlights">
      <div className="container">
        <SectionHeading
          index="Project highlights"
          title="Selected systems, explained through the decisions behind them."
          description="Each highlight combines measurable scope, architecture choices, implementation evidence, and a dedicated case-study page."
        />

        <div className="highlight-list">
          {caseStudies.map((project) => (
            <article className="highlight-card" key={project.slug}>
              <div className="highlight-card__number">{project.number}</div>
              <div className="highlight-card__content">
                <div className="highlight-card__meta">
                  <span>{project.type}</span>
                  <span>{project.period}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="highlight-card__summary">{project.summary}</p>
                <ArchitectureDiagram variant={project.architecture} compact />
                <MetricGrid metrics={project.metrics} compact />
                <div className="highlight-card__contribution">
                  <strong>What I implemented</strong>
                  <p>{project.contribution}</p>
                </div>
                <TechnologyList items={project.technologies.slice(0, 7)} />
                <div className="highlight-card__actions">
                  <a className="text-link text-link--light" href={caseStudyHref(project.slug)}>
                    Read case study <ArrowIcon />
                  </a>
                  <a
                    className="text-link text-link--muted"
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open repository <ArrowIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EngineeringJourney() {
  return (
    <section className="section journey-section" id="journey">
      <div className="container journey-layout">
        <div className="journey-intro">
          <SectionHeading
            index="Engineering journey"
            title="A focused path from cloud foundations into DevOps Engineering."
            description="This timeline shows increasing technical scope without repeating the featured project descriptions or presenting portfolio work as employment history."
          />
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <TechnologyList items={group.skills} />
              </div>
            ))}
          </div>
        </div>

        <div className="timeline">
          {journey.map((item) => (
            <article className="timeline-item" key={item.title}>
              <div className="timeline-item__marker" aria-hidden="true" />
              <div className="timeline-item__period">{item.period}</div>
              <div className="timeline-item__body">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <TechnologyList items={item.technologies} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LearningEducation() {
  return (
    <section className="section learning-section" id="learning">
      <div className="container">
        <SectionHeading
          index="Learning & education"
          title="Formal education, current preparation, and structured practice."
          description="Completed education remains separate from certification preparation and ongoing project learning."
        />
        <div className="learning-grid">
          {learning.map((item) => {
            const content = (
              <>
                <span>{item.kicker}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                {item.url && (
                  <div className="learning-card__link">
                    Open project index <ArrowIcon />
                  </div>
                )}
              </>
            )

            return item.url ? (
              <a
                className="learning-card"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                key={item.title}
              >
                {content}
              </a>
            ) : (
              <article className="learning-card" key={item.title}>
                {content}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ProjectArchive() {
  const [query, setQuery] = useState('')
  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return archiveProjects

    return archiveProjects.filter((project) =>
      [project.type, project.name, project.period, project.description, ...project.technologies]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    )
  }, [query])

  return (
    <section className="section archive-section" id="archive">
      <div className="container">
        <SectionHeading
          index="Project archive"
          title="Search the portfolio by service, skill, or system type."
          description="The archive stays concise because the three featured systems now have full case studies above."
        />

        <div className="archive-search">
          <label htmlFor="project-search">Search by keyword</label>
          <div className="archive-search__control">
            <span aria-hidden="true">⌕</span>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Terraform, IAM, Docker, serverless…"
            />
            <strong>{filteredProjects.length} projects</strong>
          </div>
        </div>

        <div className="archive-grid" aria-live="polite">
          {filteredProjects.map((project) => {
            const href = project.caseStudySlug ? caseStudyHref(project.caseStudySlug) : project.url
            const external = Boolean(project.url)

            return (
              <a
                className="archive-card"
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                key={project.name}
              >
                <div className="archive-card__meta">
                  <span>{project.type}</span>
                  <span>{project.period}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <TechnologyList items={project.technologies} />
                <div className="archive-card__link">
                  {project.caseStudySlug ? 'Read case study' : 'View repository'} <ArrowIcon />
                </div>
              </a>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <h3>No matching projects yet.</h3>
            <p>Try a broader keyword such as AWS, Terraform, security, Docker, or networking.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-panel">
        <p className="eyebrow">Let&apos;s build reliable systems</p>
        <h2>Looking for a cloud engineer who documents the reasoning, not only the result?</h2>
        <p>
          I am open to cloud infrastructure and DevOps opportunities where I can contribute to
          secure, repeatable systems while continuing to grow.
        </p>
        <div className="contact-panel__actions">
          <a className="button button--light" href="mailto:simeonvault@gmail.com">
            Email Simeon <ArrowIcon />
          </a>
          <a href="https://www.linkedin.com/in/simeon-siaka-8a8367312/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/simeonprimordial" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={`${import.meta.env.BASE_URL}Simeon-Siaka-Cloud-Infrastructure-CV.pdf`} download>
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
