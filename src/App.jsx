import { useState } from 'react'

const navItems = [
  { href: '#work', label: 'Work' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#approach', label: 'Approach' },
  { href: '#journey', label: 'Journey' },
]

const featuredProjects = [
  {
    number: '01',
    status: 'Architecture case study',
    name: 'LogiHaul Reference Architecture',
    summary:
      'A serverless-first logistics platform designed to absorb a 50× demand spike without forcing every workload onto the same scaling model.',
    outcome:
      'Separated high-volume order intake, live tracking, relational billing, and asynchronous notifications into purpose-built data and compute paths.',
    technologies: ['DynamoDB', 'Lambda', 'SQS', 'RDS MySQL', 'ElastiCache'],
    url: 'https://github.com/simeonprimordial/logihaul-reference-architecture',
    accent: 'mint',
  },
  {
    number: '02',
    status: 'Deployed system',
    name: 'FinTrust Customer Portal',
    summary:
      'A containerized three-tier customer portal with repeatable infrastructure, private application and database layers, and managed credentials.',
    outcome:
      'Combined Terraform, ECR, an Application Load Balancer, Auto Scaling, RDS, and Secrets Manager into one documented delivery path.',
    technologies: ['Terraform', 'Docker', 'ECR', 'ALB', 'Auto Scaling', 'RDS'],
    url: 'https://github.com/simeonprimordial/fintrust-customer-portal',
    accent: 'amber',
  },
  {
    number: '03',
    status: 'Secure delivery',
    name: 'NovaTech Serverless Website',
    summary:
      'A private-origin static website delivered globally through CloudFront and deployed without long-lived AWS credentials.',
    outcome:
      'Implemented CloudFront Origin Access Control and GitHub Actions OIDC, then documented the security and deployment decisions.',
    technologies: ['S3', 'CloudFront', 'OAC', 'GitHub Actions', 'OIDC', 'IAM'],
    url: 'https://github.com/simeonprimordial/novatech-serverless-website',
    accent: 'blue',
  },
  {
    number: '04',
    status: 'Active build',
    name: 'CloudDesk Multi-Tenant SaaS',
    summary:
      'The next portfolio stage: a tenant-aware SaaS platform where identity, authorization, isolation, and infrastructure must work as one system.',
    outcome:
      'Currently building the authentication foundation with Amazon Cognito, OIDC, Go, and explicit multi-tenant architecture decisions.',
    technologies: ['Go', 'Amazon Cognito', 'OIDC', 'Multi-tenancy', 'AWS'],
    url: 'https://github.com/simeonprimordial/clouddesk-multi-tenant-saas',
    accent: 'violet',
  },
]

const otherProjects = [
  {
    name: 'Highly Available Web Application',
    detail: 'ALB, Launch Templates and Auto Scaling provisioned with Terraform',
    url: 'https://github.com/simeonprimordial/highly-available-web-app-terraform',
  },
  {
    name: 'FinTrust NLB Docker Service',
    detail: 'Containerized Flask workload behind a Network Load Balancer',
    url: 'https://github.com/simeonprimordial/fintrust-nlb-docker',
  },
  {
    name: 'Lagos Law Firm S3 DMS',
    detail: 'Encrypted document storage, lifecycle controls and presigned access',
    url: 'https://github.com/simeonprimordial/lagos-lawfirm-s3-dms',
  },
  {
    name: 'AWS 80 Projects Challenge',
    detail: 'The central index tracking completed and active cloud builds',
    url: 'https://github.com/simeonprimordial/AWS80ProjectsChallenge',
  },
]

const capabilities = [
  {
    code: 'ARCH',
    title: 'Cloud architecture',
    description:
      'Translate workload, availability, data, security, and cost requirements into an AWS design with explicit trade-offs.',
    evidence: ['VPC design', 'Load balancing', 'Auto Scaling', 'Serverless patterns'],
  },
  {
    code: 'IAC',
    title: 'Infrastructure as Code',
    description:
      'Build reproducible environments with Terraform instead of relying on undocumented console configuration.',
    evidence: ['Terraform modules', 'Variables & outputs', 'Validation', 'State awareness'],
  },
  {
    code: 'SEC',
    title: 'Security engineering',
    description:
      'Reduce unnecessary exposure through private origins, least-privilege IAM, short-lived identity, and managed secrets.',
    evidence: ['IAM', 'OIDC', 'Secrets Manager', 'Private networking'],
  },
  {
    code: 'SHIP',
    title: 'Delivery automation',
    description:
      'Connect source control to safe, repeatable delivery workflows with validation before infrastructure or application changes ship.',
    evidence: ['GitHub Actions', 'Docker', 'ECR', 'CI checks'],
  },
  {
    code: 'OPS',
    title: 'Systems operations',
    description:
      'Work comfortably across Linux, networking, bootstrap automation, health checks, logs, and failure investigation.',
    evidence: ['Linux', 'Bash', 'CloudWatch', 'Troubleshooting'],
  },
  {
    code: 'DOCS',
    title: 'Engineering documentation',
    description:
      'Make infrastructure reviewable with diagrams, decision records, runbooks, deployment steps, and lessons learned.',
    evidence: ['ADRs', 'Diagrams', 'Runbooks', 'README systems'],
  },
]

const principles = [
  {
    number: '01',
    title: 'Design for the failure path',
    text: 'I look for single points of failure, scaling ceilings, credential exposure, and recovery gaps before calling an architecture complete.',
  },
  {
    number: '02',
    title: 'Automate what must be repeatable',
    text: 'Infrastructure, validation, and deployment steps belong in code so a successful build is not dependent on memory or manual clicks.',
  },
  {
    number: '03',
    title: 'Leave an operational trail',
    text: 'A useful project explains why decisions were made, how the system is verified, and where an engineer should look when it fails.',
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-mark__node brand-mark__node--one" />
      <span className="brand-mark__node brand-mark__node--two" />
      <span className="brand-mark__node brand-mark__node--three" />
      <span className="brand-mark__line brand-mark__line--one" />
      <span className="brand-mark__line brand-mark__line--two" />
    </span>
  )
}

function ArchitecturePanel() {
  return (
    <div className="architecture-shell">
      <div className="architecture-shell__header">
        <div className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>portfolio-topology.yml</span>
        <span className="architecture-shell__region">af-south-1</span>
      </div>

      <div className="topology" aria-hidden="true">
        <svg className="topology__connections" viewBox="0 0 600 420" preserveAspectRatio="none">
          <path d="M78 80 C160 80 158 170 230 170" />
          <path d="M230 170 C300 170 300 96 380 96" />
          <path d="M230 170 C320 170 310 260 404 260" />
          <path d="M404 260 C485 260 486 160 540 160" />
          <path d="M404 260 C470 260 475 338 536 338" />
        </svg>

        <div className="topology-node topology-node--edge">
          <span className="topology-node__type">EDGE</span>
          <strong>CloudFront</strong>
          <small>global delivery</small>
        </div>
        <div className="topology-node topology-node--gateway">
          <span className="topology-node__type">ROUTE</span>
          <strong>Load balancer</strong>
          <small>health-aware traffic</small>
        </div>
        <div className="topology-node topology-node--compute">
          <span className="topology-node__type">COMPUTE</span>
          <strong>Auto Scaling</strong>
          <small>replace · recover · scale</small>
        </div>
        <div className="topology-node topology-node--identity">
          <span className="topology-node__type">IDENTITY</span>
          <strong>OIDC + IAM</strong>
          <small>short-lived access</small>
        </div>
        <div className="topology-node topology-node--data">
          <span className="topology-node__type">DATA</span>
          <strong>RDS / DynamoDB</strong>
          <small>workload-fit storage</small>
        </div>
        <div className="topology-node topology-node--observe">
          <span className="topology-node__type">SIGNAL</span>
          <strong>CloudWatch</strong>
          <small>logs · metrics · alarms</small>
        </div>
      </div>

      <div className="terminal-log" aria-hidden="true">
        <div><span className="terminal-log__prompt">$</span> terraform validate</div>
        <div><span className="terminal-log__ok">✓</span> configuration is valid</div>
        <div><span className="terminal-log__prompt">$</span> deploy --identity oidc</div>
        <div><span className="terminal-log__ok">✓</span> temporary credentials issued</div>
      </div>

      <p className="sr-only">
        A cloud architecture diagram showing secure delivery, traffic routing, scalable compute,
        workload-fit data services, identity controls, and observability.
      </p>
    </div>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="section-heading__eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <nav className="nav container" aria-label="Primary navigation">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Simeon on the Cloud, home">
            <BrandMark />
            <span className="brand__text">
              <strong>Simeon</strong>
              <small>on the cloud</small>
            </span>
          </a>

          <div className="nav__links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </div>

          <a className="nav__cta" href="mailto:simeonvault@gmail.com">Start a conversation</a>

          <button
            className="nav__menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </nav>

        <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <a href="mailto:simeonvault@gmail.com" onClick={closeMenu}>Start a conversation</a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero__grid container">
            <div className="hero__copy">
              <div className="availability-pill">
                <span className="availability-pill__signal" />
                Open to cloud infrastructure and DevOps opportunities
              </div>

              <p className="hero__kicker">Cloud infrastructure engineer · AWS · Terraform · Automation</p>
              <h1>
                I turn cloud diagrams into infrastructure that can
                <span> survive production.</span>
              </h1>
              <p className="hero__intro">
                I build and document secure, fault-tolerant AWS systems—then automate the path
                from source control to a repeatable deployment.
              </p>

              <div className="hero__actions">
                <a className="button button--primary" href="#work">
                  Explore engineering work
                  <ArrowIcon />
                </a>
                <a
                  className="button button--secondary"
                  href="https://github.com/simeonprimordial"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub
                </a>
              </div>

              <div className="hero__proof" aria-label="Portfolio progress">
                <div>
                  <strong>7</strong>
                  <span>completed cloud projects</span>
                </div>
                <div>
                  <strong>1</strong>
                  <span>multi-tenant SaaS build active</span>
                </div>
                <div>
                  <strong>80</strong>
                  <span>project engineering roadmap</span>
                </div>
              </div>
            </div>

            <ArchitecturePanel />
          </div>
        </section>

        <section className="signal-strip" aria-label="Core engineering focus">
          <div className="container signal-strip__inner">
            <span>Architecture decisions</span>
            <span>Infrastructure as Code</span>
            <span>Least-privilege security</span>
            <span>Automated validation</span>
            <span>Operational documentation</span>
          </div>
        </section>

        <section className="section projects-section" id="work">
          <div className="container">
            <SectionHeading
              eyebrow="01 / Selected systems"
              title="Infrastructure work with a reason behind every service."
              description="These projects are presented as engineering case studies: the workload, the architecture decision, the implementation path, and the operational result."
            />

            <div className="project-grid">
              {featuredProjects.map((project) => (
                <a
                  className={`project-card project-card--${project.accent}`}
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project-card__topline">
                    <span className="project-card__number">{project.number}</span>
                    <span className="project-card__status">{project.status}</span>
                    <ArrowIcon />
                  </div>
                  <h3>{project.name}</h3>
                  <p className="project-card__summary">{project.summary}</p>
                  <div className="project-card__outcome">
                    <span>Engineering outcome</span>
                    <p>{project.outcome}</p>
                  </div>
                  <div className="tag-list">
                    {project.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            <div className="project-index">
              <div className="project-index__intro">
                <span>More builds</span>
                <p>Foundational projects that show the progression from individual AWS services to complete systems.</p>
              </div>
              <div className="project-index__list">
                {otherProjects.map((project, index) => (
                  <a key={project.name} href={project.url} target="_blank" rel="noopener noreferrer">
                    <span className="project-index__number">{String(index + 5).padStart(2, '0')}</span>
                    <span className="project-index__name">{project.name}</span>
                    <span className="project-index__detail">{project.detail}</span>
                    <ArrowIcon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section capabilities-section" id="capabilities">
          <div className="container">
            <SectionHeading
              eyebrow="02 / Capability map"
              title="The work spans design, delivery, security, and operations."
              description="Tools matter, but the stronger signal is how they are applied together across an infrastructure lifecycle."
            />

            <div className="capability-grid">
              {capabilities.map((capability) => (
                <article className="capability-card" key={capability.code}>
                  <div className="capability-card__code">{capability.code}</div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <ul>
                    {capability.evidence.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section approach-section" id="approach">
          <div className="container approach-layout">
            <div className="approach-intro">
              <span className="section-heading__eyebrow">03 / Engineering approach</span>
              <h2>Build it so another engineer can trust it.</h2>
              <p>
                My portfolio is moving from service demonstrations toward systems that are secure,
                reproducible, reviewable, and honest about their limits.
              </p>
              <div className="approach-intro__command">
                <span>$</span> architecture --validate --document --improve
              </div>
            </div>

            <div className="principle-list">
              {principles.map((principle) => (
                <article key={principle.number}>
                  <span>{principle.number}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section journey-section" id="journey">
          <div className="container journey-panel">
            <div className="journey-panel__copy">
              <span className="section-heading__eyebrow">04 / Continuous build</span>
              <h2>Seven projects complete. The systems are getting harder.</h2>
              <p>
                The AWS 80 Projects Challenge is my structured path from cloud foundations to
                platform engineering, observability, security, containers, data systems, and disaster recovery.
              </p>
              <a
                className="text-link"
                href="https://github.com/simeonprimordial/AWS80ProjectsChallenge"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the full project index <ArrowIcon />
              </a>
            </div>

            <div className="journey-panel__progress">
              <div className="progress-header">
                <span>Portfolio roadmap</span>
                <strong>7 / 80</strong>
              </div>
              <div className="progress-track" aria-label="7 of 80 projects completed">
                <span style={{ width: '8.75%' }} />
              </div>
              <div className="roadmap-list">
                <div className="roadmap-item roadmap-item--complete">
                  <span>01</span>
                  <div><strong>Cloud foundations</strong><small>compute · storage · delivery</small></div>
                  <b>complete</b>
                </div>
                <div className="roadmap-item roadmap-item--active">
                  <span>02</span>
                  <div><strong>Production-oriented systems</strong><small>IaC · containers · secure CI/CD</small></div>
                  <b>active</b>
                </div>
                <div className="roadmap-item">
                  <span>03</span>
                  <div><strong>Platforms and observability</strong><small>ECS · Kubernetes · telemetry</small></div>
                  <b>next</b>
                </div>
                <div className="roadmap-item">
                  <span>04</span>
                  <div><strong>Resilience at scale</strong><small>DR · data · security controls</small></div>
                  <b>planned</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-panel">
            <div>
              <span className="section-heading__eyebrow">05 / Connect</span>
              <h2>Need an engineer who thinks beyond the happy path?</h2>
            </div>
            <div className="contact-panel__action">
              <p>
                I am open to cloud infrastructure, DevOps, and platform-focused opportunities where
                I can keep learning while contributing to reliable systems.
              </p>
              <div className="contact-links">
                <a className="button button--primary" href="mailto:simeonvault@gmail.com">
                  Email Simeon
                  <ArrowIcon />
                </a>
                <a href="https://www.linkedin.com/in/simeon-siaka-8a8367312/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/simeonprimordial" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div className="site-footer__brand">
            <BrandMark />
            <span>Simeon on the Cloud</span>
          </div>
          <p>© {currentYear} Simeon Siaka · Built as an evolving cloud engineering record.</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
