import { ArchitectureDiagram } from '../components/ArchitectureDiagram'
import { ArrowIcon, MetricGrid, TechnologyList } from '../components/Common'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'
import { caseStudies } from '../data/portfolio'
import { caseStudyHref, homeHref, navigate } from '../lib/routing'

function DetailList({ title, items }) {
  return (
    <section className="case-study__detail-block">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

const nextStepsBySlug = {
  logihaul: [
    'Prototype the order-intake path with synthetic 50× load and publish capacity evidence.',
    'Add chaos testing for AZ failure and validate recovery runbooks against the documented design.',
    'Cost-model DynamoDB on-demand vs provisioned for promotional windows.',
  ],
  fintrust: [
    'Add blue/green or canary deploys behind the ALB for safer application releases.',
    'Wire application metrics and RDS performance insights into a single operations dashboard.',
    'Extend CI to plan Terraform against a non-production workspace on every pull request.',
  ],
  novatech: [
    'Add preview deployments per pull request with a dedicated CloudFront behavior or path.',
    'Automate security scanning of static assets and dependency manifests in the same pipeline.',
    'Document a rollback path that restores the previous S3 prefix and invalidates the edge cache.',
  ],
}

function goHomeProjects(event) {
  event.preventDefault()
  navigate(`${homeHref()}#projects`)
}

export default function CaseStudyPage({ project }) {
  const nextSteps = nextStepsBySlug[project.slug] || [
    'Capture additional runtime evidence and cost snapshots for the next design review.',
  ]

  const related = caseStudies.filter((item) => item.slug !== project.slug).slice(0, 2)

  return (
    <div className="site-shell case-study-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader caseStudy />

      <main id="main-content">
        <section className="case-study-hero" id="top">
          <div className="container case-study-hero__grid">
            <div>
              <p className="eyebrow">
                {project.type} · {project.period}
              </p>
              <h1>{project.name}</h1>
              <p className="case-study-hero__intro">{project.summary}</p>
              <div className="case-study-hero__actions">
                <a
                  className="button button--primary"
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View repository <ArrowIcon />
                </a>
                <a className="button button--secondary" href={`${homeHref()}#projects`} onClick={goHomeProjects}>
                  Back to portfolio
                </a>
              </div>
            </div>
            <MetricGrid metrics={project.metrics} />
          </div>
        </section>

        <section className="section case-study-overview">
          <div className="container case-study-overview__grid">
            <div className="case-study-overview__copy">
              <span>Business problem</span>
              <h2>Business Requirements</h2>
              <p>{project.problem}</p>
            </div>
            <div className="case-study-overview__copy">
              <span>My contribution</span>
              <h2>Engineering Contribution</h2>
              <p>{project.contribution}</p>
            </div>
          </div>
        </section>

        <section className="section case-study-architecture">
          <div className="container">
            <div className="case-study-section-heading">
              <span>Architecture</span>
              <h2>System Architecture</h2>
            </div>
            <ArchitectureDiagram variant={project.architecture} />
          </div>
        </section>

        <section className="section case-study-decisions">
          <div className="container">
            <div className="case-study-section-heading">
              <span>Design decisions</span>
              <h2>Architecture Decisions</h2>
            </div>
            <div className="decision-grid">
              {project.decisions.map((decision, index) => (
                <article className="decision-card" key={decision.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section evidence-section">
          <div className="container">
            <div className="case-study-section-heading">
              <span>Visual evidence</span>
              <h2>Engineering Evidence</h2>
            </div>
            <div className="evidence-grid">
              {project.evidence.map((item, index) => (
                <article className="evidence-card" key={item.title}>
                  <div className="evidence-card__window">
                    <div className="evidence-card__toolbar">
                      <span />
                      <span />
                      <span />
                      <strong>evidence-{String(index + 1).padStart(2, '0')}</strong>
                    </div>
                    {item.image ? (
                      <figure className="evidence-card__figure">
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          loading="lazy"
                          decoding="async"
                        />
                        <figcaption>
                          <small>{item.label}</small>
                          <strong>{item.title}</strong>
                          <p>{item.text}</p>
                        </figcaption>
                      </figure>
                    ) : (
                      <div className="evidence-card__body">
                        <small>{item.label}</small>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                        <div className="evidence-card__status">✓ documented and verified</div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <p className="evidence-source-note">
              Screenshots and diagrams are sourced from the project repository evidence folders.
            </p>
          </div>
        </section>

        <section className="section case-study-details">
          <div className="container case-study-details__grid">
            <DetailList title="Responsibilities" items={project.responsibilities} />
            <DetailList title="Security Controls" items={project.security} />
            <DetailList title="Resilience & Scaling" items={project.resilience} />
            <DetailList title="Deployment Workflow" items={project.deployment} />
          </div>
        </section>

        <section className="section case-study-lessons">
          <div className="container case-study-lessons__grid">
            <div>
              <span>Lessons learned</span>
              <h2>Engineering Lessons</h2>
            </div>
            <ol>
              {project.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section case-study-lessons">
          <div className="container case-study-lessons__grid">
            <div>
              <span>What I would do next</span>
              <h2>Next Engineering Steps</h2>
            </div>
            <ol>
              {nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section case-study-stack">
          <div className="container case-study-stack__grid">
            <div>
              <span>Technology stack</span>
              <h2>Technology Stack</h2>
              <TechnologyList items={project.technologies} />
            </div>
            <aside className="demo-status">
              <span>Demo status</span>
              <p>{project.demoStatus}</p>
              <a
                className="text-link"
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Review the complete evidence <ArrowIcon />
              </a>
            </aside>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section case-study-overview">
            <div className="container">
              <div className="case-study-section-heading">
                <span>Continue exploring</span>
                <h2>Related Case Studies</h2>
              </div>
              <div className="decision-grid">
                {related.map((item) => (
                  <article className="decision-card" key={item.slug}>
                    <span>{item.number}</span>
                    <h3>{item.name}</h3>
                    <p>{item.summary}</p>
                    <a
                      className="text-link"
                      href={caseStudyHref(item.slug)}
                      onClick={(event) => {
                        event.preventDefault()
                        navigate(caseStudyHref(item.slug))
                      }}
                    >
                      Read case study <ArrowIcon />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
