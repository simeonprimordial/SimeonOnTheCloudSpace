const certificates = [
  {
    provider: 'Amazon Web Services · Coursera',
    title: 'AWS Cloud Solutions Architect Professional Certificate',
    url: 'https://www.coursera.org/programs/devcareer-learning-for-impact-devops-cloud-engineering-l9noi/professional-certificates/aws-cloud-solutions-architect?collectionId=77egH',
  },
  {
    provider: 'Amazon Web Services · Coursera',
    title: 'AWS Cloud Support Associate Professional Certificate',
    url: 'https://www.coursera.org/programs/devcareer-learning-for-impact-devops-cloud-engineering-l9noi/professional-certificates/aws-cloud-support-associate?collectionId=77egH',
  },
  {
    provider: 'Microsoft · Coursera',
    title: 'Microsoft Cloud Support Associate Professional Certificate',
    url: 'https://www.coursera.org/programs/devcareer-learning-for-impact-devops-cloud-engineering-l9noi/professional-certificates/microsoft-cloud-support-associate?collectionId=77egH',
  },
  {
    provider: 'IBM · Coursera',
    title: 'IBM Applied DevOps Engineering Professional Certificate',
    url: 'https://www.coursera.org/programs/devcareer-learning-for-impact-devops-cloud-engineering-l9noi/professional-certificates/ibm-applied-devops-engineering?collectionId=77egH',
  },
  {
    provider: 'Coursera',
    title: 'DevOps and Software Engineering Professional Certificate',
    url: 'https://www.coursera.org/programs/devcareer-learning-for-impact-devops-cloud-engineering-l9noi/professional-certificates/devops-and-software-engineering?collectionId=77egH',
  },
  {
    provider: 'Microsoft',
    title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
  },
]

export function Certificates() {
  return (
    <section className="clean-section clean-section--soft certificates" id="certifications">
      <div className="container">
        <div className="clean-section__heading">
          <div>
            <p className="clean-kicker">Credentials</p>
            <h2 className="clean-title">Certifications &amp; Professional Certificates</h2>
          </div>
          <p className="clean-lead">
            Cloud, DevOps, and infrastructure credentials supporting a practical, multi-cloud
            engineering foundation.
          </p>
        </div>

        <div className="certificates__grid">
          {certificates.map((certificate, index) => {
            const content = (
              <>
                <span className="certificates__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="certificates__provider">{certificate.provider}</span>
                <h3>{certificate.title}</h3>
                {certificate.url && (
                  <span className="certificates__link">View certificate program ↗</span>
                )}
              </>
            )

            return certificate.url ? (
              <a
                className="certificates__card"
                href={certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                key={certificate.title}
              >
                {content}
              </a>
            ) : (
              <article className="certificates__card" key={certificate.title}>
                {content}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
