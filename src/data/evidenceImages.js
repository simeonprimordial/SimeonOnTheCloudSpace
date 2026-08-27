/**
 * Real screenshots and diagrams from each project repository.
 * Sourced from docs/ and evidence/ folders so the portfolio stays linked to the work.
 */

const raw = (repo, path) =>
  `https://raw.githubusercontent.com/simeonprimordial/${repo}/main/${path
    .split('/')
    .map(encodeURIComponent)
    .join('/')}`

export const evidenceImagesBySlug = {
  logihaul: [
    {
      image: raw('logihaul-reference-architecture', 'docs/logihaul-architecture.png'),
      imageAlt: 'LogiHaul six-layer AWS reference architecture diagram',
    },
    {
      image: raw('logihaul-reference-architecture', 'evidence/Databases/S4-C1.png'),
      imageAlt: 'LogiHaul database tier evidence from the architecture build',
    },
    {
      image: raw('logihaul-reference-architecture', 'evidence/Observability/S6-C1.png'),
      imageAlt: 'LogiHaul CloudWatch observability evidence',
    },
  ],
  fintrust: [
    {
      image: raw('fintrust-customer-portal', 'docs/architecture.png'),
      imageAlt: 'FinTrust three-tier architecture diagram',
    },
    {
      image: raw('fintrust-customer-portal', 'docs/screenshot/Target Group (Healthy).png'),
      imageAlt: 'FinTrust ALB target group showing healthy instances',
    },
    {
      image: raw('fintrust-customer-portal', 'docs/screenshot/ECR Repository.png'),
      imageAlt: 'FinTrust Amazon ECR repository with container images',
    },
  ],
  novatech: [
    {
      image: raw('novatech-serverless-website', 'docs/architecture.png'),
      imageAlt: 'NovaTech CloudFront and private S3 architecture diagram',
    },
    {
      image: raw(
        'novatech-serverless-website',
        'docs/screenshots/CloudFront distribution overview.png',
      ),
      imageAlt: 'NovaTech CloudFront distribution overview in the AWS console',
    },
    {
      image: raw('novatech-serverless-website', 'docs/screenshots/GitHubActions.png'),
      imageAlt: 'NovaTech GitHub Actions OIDC deployment workflow run',
    },
  ],
}

export function withEvidenceImages(project) {
  const images = evidenceImagesBySlug[project.slug] || []
  return {
    ...project,
    evidence: project.evidence.map((item, index) => ({
      ...item,
      ...(images[index] || {}),
    })),
  }
}
