import { ArchitectureDiagram } from '../components/ArchitectureDiagram'
import { ArrowIcon, MetricGrid, TechnologyList } from '../components/Common'
import { SiteFooter, SiteHeader } from '../components/SiteChrome'

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

export default function CaseStudyPage({ project }) {
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
                <a className="button button--secondary" href="./#highlights">
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
              <h2>What the system needed to solve</h2>
              <p>{project.problem}</p>
            </div>
            <div className="case-study-overview__copy">
              <span>My contribution</span>
              <h2>What I implemented</h2>
              <p>{project.contribution}</p>
            </div>
          </div>
        </section>

        <section className="section case-study-architecture">
          <div className="container">
            <div className="case-study-section-heading">
              <span>Architecture</span>
              <h2>The operating model at a glance</h2>
            </div>
            <ArchitectureDiagram variant={project.architecture} />
          </div>
        </section>

        <section className="section case-study-decisions">
          <div className="container">
            <div className="case-study-section-heading">
              <span>Design decisions</span>
              <h2>Why the services were used this way</h2>
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
              <h2>Architecture, delivery, and operational proof</h2>
            </div>
            <div className="evidence-grid">
              {project.evidence.map((item, index) => (
                <article className="evidence-card" key={item.title}>
                  <div className="evidence-card__window">
                    <div className="evidence-card__toolbar">
                      <span />
                      <span />
                      <span />
                      <strong>evidence-{String(index + 1).padStart(2, '0')}.log</strong>
                    </div>
                    <div className="evidence-card__body">
                      <small>{item.label}</small>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                      <div className="evidence-card__status">✓ documented and verified</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section case-study-details">
          <div className="container case-study-details__grid">
            <DetailList title="Responsibilities" items={project.responsibilities} />
            <DetailList title="Security controls" items={project.security} />
            <DetailList title="Failure and scaling considerations" items={project.resilience} />
            <DetailList title="Deployment workflow" items={project.deployment} />
          </div>
        </section>

        <section className="section case-study-lessons">
          <div className="container case-study-lessons__grid">
            <div>
              <span>Lessons learned</span>
              <h2>What the project changed in my engineering approach</h2>
            </div>
            <ol>
              {project.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section case-study-stack">
          <div className="container case-study-stack__grid">
            <div>
              <span>Technology stack</span>
              <h2>Services and tools used</h2>
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
      </main>

      <SiteFooter />
    </div>
  )
}
