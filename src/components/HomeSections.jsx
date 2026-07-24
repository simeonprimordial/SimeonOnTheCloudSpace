import {
  archiveProjects,
  caseStudies,
  professionalSummary,
  skillGroups,
} from '../data/portfolio'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { ArrowIcon, TechnologyList } from './Common'

function caseStudyHref(slug) {
  return `?case=${encodeURIComponent(slug)}`
}

export function Hero() {
  return (
    <section className="clean-hero" id="top">
      <div className="clean-hero__media" aria-hidden="true">
        <img
          className="clean-hero__image"
          src="https://avatars.githubusercontent.com/u/263141357?v=4"
          alt=""
        />
        <div className="clean-hero__veil" />
      </div>

      <div className="container clean-hero__inner">
        <div className="clean-hero__copy">
          <p className="clean-kicker clean-kicker--light">Simeon on the Cloud · Nigeria</p>
          <h1 className="clean-hero__name">Simeon Siaka</h1>
          <p className="clean-hero__role">Cloud Infrastructure &amp; DevOps Engineer</p>
          <p className="clean-hero__support">
            I build secure, repeatable AWS infrastructure and delivery systems—with clear
            architecture, practical automation, and documentation another engineer can follow.
          </p>

          <div className="clean-hero__actions">
            <a className="clean-button clean-button--primary" href="#projects">
              View projects <ArrowIcon />
            </a>
            <a
              className="clean-button clean-button--ghost"
              href={`${import.meta.env.BASE_URL}Simeon-Siaka-Cloud-Infrastructure-CV.pdf`}
              download
            >
              Download CV
            </a>
          </div>

          <div className="clean-hero__links" aria-label="Professional profiles">
            <a href="https://github.com/simeonprimordial" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/simeon-siaka-8a8367312/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:simeonvault@gmail.com">Email</a>
          </div>

          <p className="clean-hero__availability">
            <span aria-hidden="true" />
            Open to junior cloud, DevOps, and cloud support opportunities
          </p>
        </div>
      </div>
    </section>
  )
}

export function ProjectHighlights() {
  const [featuredProject, ...selectedProjects] = caseStudies

  return (
    <section className="clean-section clean-section--soft" id="projects">
      <div className="container">
        <div className="clean-section__heading">
          <div>
            <p className="clean-kicker">Featured work</p>
            <h2 className="clean-title">Cloud systems presented as engineering case studies.</h2>
          </div>
          <p className="clean-lead">
            A focused selection showing architecture decisions, security controls, automation,
            failure thinking, and the evidence used to verify each build.
          </p>
        </div>

        <article className="featured-project">
          <div className="featured-project__visual">
            <ArchitectureDiagram variant={featuredProject.architecture} compact />
          </div>

          <div className="featured-project__content">
            <div className="clean-meta">
              <span>{featuredProject.type}</span>
              <span>{featuredProject.period}</span>
            </div>
            <h3>{featuredProject.name}</h3>
            <p>{featuredProject.summary}</p>

            <dl className="featured-project__details">
              <div>
                <dt>Challenge</dt>
                <dd>{featuredProject.problem}</dd>
              </div>
              <div>
                <dt>My contribution</dt>
                <dd>{featuredProject.contribution}</dd>
              </div>
            </dl>

            <TechnologyList items={featuredProject.technologies.slice(0, 7)} />

            <div className="clean-actions">
              <a className="clean-text-link" href={caseStudyHref(featuredProject.slug)}>
                Read case study <ArrowIcon />
              </a>
              <a
                className="clean-text-link clean-text-link--muted"
                href={featuredProject.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View repository <ArrowIcon />
              </a>
            </div>
          </div>
        </article>

        <div className="selected-projects">
          {selectedProjects.map((project) => (
            <article className="selected-project" key={project.slug}>
              <div className="clean-meta">
                <span>{project.type}</span>
                <span>{project.period}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <TechnologyList items={project.technologies.slice(0, 5)} />
              <div className="selected-project__footer">
                <a className="clean-text-link" href={caseStudyHref(project.slug)}>
                  Read case study <ArrowIcon />
                </a>
                <a
                  aria-label={`Open ${project.name} repository`}
                  className="selected-project__repo"
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section className="clean-section" id="about">
      <div className="container clean-about">
        <div className="clean-about__intro">
          <p className="clean-kicker">About</p>
          <h2 className="clean-title">I am building depth, not just collecting tools.</h2>
        </div>

        <div className="clean-about__copy">
          <p className="clean-about__summary">{professionalSummary}</p>
          <p>
            My physics background shapes how I work: define the constraints, understand the
            system, test assumptions, and make trade-offs visible. Every project is documented so
            the result can be reviewed, reproduced, and improved.
          </p>
        </div>

        <div className="capability-grid">
          {skillGroups.map((group, index) => (
            <article className="capability-card" key={group.title}>
              <span>0{index + 1}</span>
              <h3>{group.title}</h3>
              <TechnologyList items={group.skills} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProjectArchive() {
  const additionalProjects = archiveProjects.filter((project) => !project.caseStudySlug)

  return (
    <section className="clean-section clean-section--compact clean-section--bordered" id="more-work">
      <div className="container">
        <div className="clean-section__heading clean-section__heading--compact">
          <div>
            <p className="clean-kicker">More work</p>
            <h2 className="clean-title clean-title--small">Additional hands-on cloud projects.</h2>
          </div>
          <a
            className="clean-text-link"
            href="https://github.com/simeonprimordial?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            See all repositories <ArrowIcon />
          </a>
        </div>

        <div className="project-index">
          {additionalProjects.map((project, index) => (
            <a
              className="project-index__row"
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
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="clean-contact" id="contact">
      <div className="container clean-contact__inner">
        <p className="clean-kicker clean-kicker--light">Let&apos;s connect</p>
        <h2>Looking for someone who can grow into reliable cloud operations?</h2>
        <p>
          I am open to junior cloud infrastructure, DevOps, and cloud support roles where I can
          contribute, learn from experienced engineers, and keep building production-minded
          systems.
        </p>
        <div className="clean-contact__actions">
          <a className="clean-button clean-button--light" href="mailto:simeonvault@gmail.com">
            Email Simeon <ArrowIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/simeon-siaka-8a8367312/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="https://github.com/simeonprimordial" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
