const githubUsername = 'simeonprimordial'

const excludedRepositories = new Set(['simeonprimordial'])

const projectProfiles = {
  'clouddesk-multi-tenant-saas': {
    title: 'CloudDesk Multi-Tenant SaaS',
    type: 'Serverless SaaS backend',
    summary:
      'Multi-tenant backend with Cognito identity, tenant RBAC, private PostgreSQL connectivity, automated testing, keyless deployment, and CloudWatch observability.',
    skills: [
      'AWS SAM',
      'Lambda',
      'API Gateway',
      'Cognito',
      'PostgreSQL',
      'Secrets Manager',
      'GitHub Actions',
      'OIDC',
      'CloudWatch',
      'Python',
    ],
    relevance: 100,
  },
  'fintrust-customer-portal': {
    title: 'FinTrust Customer Portal',
    type: 'Three-tier cloud application',
    summary:
      'Containerized Flask application with private compute and database layers, Terraform infrastructure, Auto Scaling, RDS, ECR, and managed secrets.',
    skills: [
      'Terraform',
      'Docker',
      'Amazon ECR',
      'Application Load Balancer',
      'Auto Scaling',
      'Amazon RDS',
      'Secrets Manager',
      'Python',
    ],
    relevance: 96,
  },
  'logihaul-reference-architecture': {
    title: 'LogiHaul Reference Architecture',
    type: 'Cloud architecture case study',
    summary:
      'Six-layer logistics architecture designed for a 50× demand spike, multi-AZ resilience, asynchronous processing, and cross-region recovery.',
    skills: [
      'AWS Architecture',
      'VPC',
      'Lambda',
      'DynamoDB',
      'SQS',
      'RDS',
      'ElastiCache',
      'CloudWatch',
      'Disaster Recovery',
    ],
    relevance: 93,
  },
  'novatech-serverless-website': {
    title: 'NovaTech Serverless Website',
    type: 'Secure serverless delivery',
    summary:
      'Private S3 origin delivered through CloudFront with GitHub Actions, OIDC authentication, least-privilege IAM, and automated cache invalidation.',
    skills: [
      'Amazon S3',
      'CloudFront',
      'Origin Access Control',
      'GitHub Actions',
      'OIDC',
      'AWS STS',
      'IAM',
      'CI/CD',
    ],
    relevance: 91,
  },
  'highly-available-web-app-terraform': {
    title: 'Highly Available Web Application',
    type: 'High availability',
    summary:
      'Terraform-provisioned web tier with an Application Load Balancer, launch template, health checks, and an Auto Scaling Group.',
    skills: ['Terraform', 'EC2', 'Application Load Balancer', 'Auto Scaling', 'Linux', 'Bash'],
    relevance: 87,
  },
  'fintrust-nlb-docker': {
    title: 'FinTrust NLB Docker Service',
    type: 'Containers and networking',
    summary:
      'Containerized Flask service deployed on EC2 through Terraform, Auto Scaling, and a Network Load Balancer.',
    skills: ['Docker', 'Terraform', 'Python', 'EC2', 'Network Load Balancer', 'Auto Scaling'],
    relevance: 83,
  },
  'lagos-lawfirm-s3-dms': {
    title: 'Lagos Law Firm S3 DMS',
    type: 'Storage security',
    summary:
      'Secure document management design using encrypted S3 storage, IAM controls, lifecycle policies, and presigned access.',
    skills: ['Amazon S3', 'IAM', 'Encryption', 'Lifecycle Policies', 'Presigned URLs', 'Security'],
    relevance: 79,
  },
  AWS80ProjectsChallenge: {
    title: 'AWS 80 Projects Challenge',
    type: 'Cloud engineering portfolio',
    summary:
      'Central index connecting the complete AWS project portfolio and documenting progression across infrastructure, delivery, security, and operations.',
    skills: ['AWS', 'Terraform', 'AWS SAM', 'Docker', 'CI/CD', 'Documentation'],
    relevance: 76,
  },
  'aws-static-website-cloudfront': {
    title: 'Static Website with CloudFront',
    type: 'Edge delivery',
    summary:
      'Static website hosted in Amazon S3 and delivered globally through CloudFront with secure AWS access controls.',
    skills: ['Amazon S3', 'CloudFront', 'IAM', 'Static Hosting', 'Edge Delivery'],
    relevance: 73,
  },
  'aws-ec2-apache-webserver': {
    title: 'EC2 Apache Web Server',
    type: 'Linux administration',
    summary:
      'EC2 provisioning, security-group configuration, Linux administration, and automated Apache web-server setup.',
    skills: ['EC2', 'Linux', 'Apache', 'Security Groups', 'Bash'],
    relevance: 69,
  },
  'aws-wordpress-lightsail': {
    title: 'WordPress on Amazon Lightsail',
    type: 'Managed hosting',
    summary:
      'WordPress deployment and administration using Amazon Lightsail, Linux, static IP addressing, and snapshots.',
    skills: ['Lightsail', 'WordPress', 'Linux', 'DNS', 'Snapshots'],
    relevance: 65,
  },
  SimeonOnTheCloudSpace: {
    title: 'Simeon on the Cloud Portfolio',
    type: 'Frontend portfolio',
    summary:
      'Responsive engineering portfolio built with React and Vite to present cloud case studies, project evidence, and professional experience.',
    skills: ['React', 'Vite', 'JavaScript', 'Responsive Design', 'GitHub Pages'],
    relevance: 58,
  },
  'aws-solutions-architect-associate-saac03': {
    title: 'AWS Solutions Architect Associate Notes',
    type: 'Learning and certification',
    summary:
      'Structured study repository covering AWS architecture concepts and preparation for the Solutions Architect Associate examination.',
    skills: ['AWS', 'Cloud Architecture', 'SAA-C03', 'Documentation', 'Learning'],
    relevance: 50,
  },
}

const fallbackRepositories = Object.entries(projectProfiles).map(([name, profile], index) => ({
  id: `fallback-${name}`,
  name,
  html_url: `https://github.com/${githubUsername}/${name}`,
  homepage: null,
  description: profile.summary,
  language: profile.skills.includes('Python') ? 'Python' : null,
  topics: [],
  fork: false,
  archived: false,
  stargazers_count: 0,
  updated_at: new Date(Date.UTC(2026, 6, 31 - index)).toISOString(),
}))

const skillMatchers = [
  ['AWS SAM', /\baws sam\b|\bsam\b/i],
  ['Terraform', /terraform|infrastructure as code|\biac\b/i],
  ['Docker', /docker|container/i],
  ['Kubernetes', /kubernetes|\bk8s\b/i],
  ['AWS Lambda', /lambda|serverless/i],
  ['API Gateway', /api gateway/i],
  ['Amazon Cognito', /cognito|jwt|authentication/i],
  ['PostgreSQL', /postgres|postgresql/i],
  ['Amazon RDS', /\brds\b|mysql|database/i],
  ['Amazon S3', /\bs3\b|object storage/i],
  ['CloudFront', /cloudfront|edge delivery|cdn/i],
  ['EC2', /\bec2\b|virtual server/i],
  ['Auto Scaling', /auto.?scal/i],
  ['Load Balancing', /load balancer|\balb\b|\bnlb\b/i],
  ['GitHub Actions', /github actions|ci\/cd|pipeline/i],
  ['OIDC', /oidc|open.?id connect|sts/i],
  ['IAM', /\biam\b|least privilege/i],
  ['CloudWatch', /cloudwatch|observability|monitoring/i],
  ['Linux', /linux|apache|bash/i],
  ['Python', /python|flask/i],
  ['React', /react|vite|frontend/i],
  ['Security', /security|encryption|secret|credential/i],
  ['Networking', /vpc|subnet|routing|network/i],
]

export const quickProjectFilters = [
  'All',
  'AWS',
  'Terraform',
  'Serverless',
  'Docker',
  'Security',
  'CI/CD',
  'Linux',
]

function unique(items) {
  return [...new Set(items.filter(Boolean))]
}

function humanizeRepositoryName(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\baws\b/gi, 'AWS')
    .replace(/\bapi\b/gi, 'API')
    .replace(/\bci cd\b/gi, 'CI/CD')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function inferSkills(repository, profile) {
  const searchable = [
    repository.name,
    repository.description,
    repository.language,
    ...(repository.topics || []),
    profile?.type,
    profile?.summary,
    ...(profile?.skills || []),
  ]
    .filter(Boolean)
    .join(' ')

  const inferred = skillMatchers
    .filter(([, matcher]) => matcher.test(searchable))
    .map(([skill]) => skill)

  return unique([
    ...(profile?.skills || []),
    ...(repository.topics || []).map((topic) => humanizeRepositoryName(topic)),
    repository.language,
    ...inferred,
  ])
}

function calculateRelevance(repository, profile) {
  if (profile?.relevance) return profile.relevance

  const searchable = `${repository.name} ${repository.description || ''} ${(repository.topics || []).join(' ')}`
  const cloudMatches = skillMatchers.filter(([, matcher]) => matcher.test(searchable)).length
  const starScore = Math.min(repository.stargazers_count || 0, 10)
  const updatedScore = repository.updated_at
    ? Math.max(0, 8 - Math.floor((Date.now() - Date.parse(repository.updated_at)) / 7_776_000_000))
    : 0

  return 30 + cloudMatches * 4 + starScore + updatedScore
}

function normalizeProject(repository) {
  const profile = projectProfiles[repository.name]
  const skills = inferSkills(repository, profile)

  return {
    id: repository.id,
    name: repository.name,
    title: profile?.title || humanizeRepositoryName(repository.name),
    type: profile?.type || 'GitHub project',
    description:
      profile?.summary ||
      repository.description ||
      'Repository containing implementation work, documentation, and engineering progress.',
    repositoryUrl: repository.html_url,
    homepage: repository.homepage,
    language: repository.language,
    skills,
    updatedAt: repository.updated_at,
    stars: repository.stargazers_count || 0,
    relevance: calculateRelevance(repository, profile),
  }
}

function mergeWithFallback(repositories) {
  const merged = new Map(fallbackRepositories.map((repository) => [repository.name, repository]))

  repositories.forEach((repository) => {
    merged.set(repository.name, repository)
  })

  return [...merged.values()]
}

export const fallbackProjects = fallbackRepositories
  .filter((repository) => !excludedRepositories.has(repository.name))
  .map(normalizeProject)
  .sort((first, second) => second.relevance - first.relevance)

export async function fetchGitHubProjects(signal) {
  const response = await fetch(
    `https://api.github.com/users/${githubUsername}/repos?per_page=100&type=owner&sort=updated`,
    {
      signal,
      headers: {
        Accept: 'application/vnd.github+json',
      },
    },
  )

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status}`)
  }

  const repositories = await response.json()

  return mergeWithFallback(repositories)
    .filter(
      (repository) =>
        !repository.fork &&
        !repository.archived &&
        !excludedRepositories.has(repository.name),
    )
    .map(normalizeProject)
    .sort((first, second) => second.relevance - first.relevance)
}
