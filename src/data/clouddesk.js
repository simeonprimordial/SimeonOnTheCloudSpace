import { archiveProjects, caseStudies, journey } from './portfolio'

export const clouddeskCaseStudy = {
  slug: 'clouddesk',
  number: '01',
  type: 'Serverless SaaS backend',
  name: 'CloudDesk Multi-Tenant SaaS',
  period: '2026',
  repositoryUrl: 'https://github.com/simeonprimordial/clouddesk-multi-tenant-saas',
  demoStatus:
    'CloudDesk was deployed and verified as a development environment. The AWS resources are not kept permanently online because the PostgreSQL database, networking, and monitoring services would create ongoing portfolio cost.',
  summary:
    'A production-inspired serverless multi-tenant SaaS backend with secure identity, tenant-level RBAC, private PostgreSQL connectivity, automated testing, keyless deployment, and AWS-native observability.',
  contribution:
    'Designed and implemented the authentication flow, tenant data model, reusable authorization guards, serverless API, private database path, Infrastructure as Code, automated quality gates, deployment identity, and operational monitoring.',
  problem:
    'CloudDesk needed to let one user belong to multiple organizations while preventing cross-tenant access, protecting tenant ownership, keeping database credentials out of source control, and remaining repeatable enough for another engineer to deploy and operate.',
  responsibilities: [
    'Designed the users, tenants, and tenant_users relational model for many-to-many membership.',
    'Implemented Cognito user provisioning and API Gateway JWT authorization for protected endpoints.',
    'Built shared membership, admin, and owner guards to centralize tenant authorization.',
    'Connected VPC-enabled Lambda functions to PostgreSQL and Secrets Manager through restricted network paths.',
    'Created AWS SAM infrastructure, GitHub Actions CI/CD, automated tests, logs, alarms, dashboards, and operational documentation.',
  ],
  decisions: [
    {
      title: 'Cognito for identity, PostgreSQL for application users',
      text: 'Cognito owns credentials and token issuance while PostgreSQL stores the CloudDesk user record, tenant ownership, memberships, and tenant-specific roles.',
    },
    {
      title: 'Membership checks for every tenant operation',
      text: 'A tenant identifier is never trusted alone. Protected operations resolve an active membership using both the requested tenant and the authenticated application user.',
    },
    {
      title: 'Shared authorization guards',
      text: 'Reusable membership, admin, and owner helpers keep permission rules consistent across handlers and reduce the risk of endpoint-specific authorization gaps.',
    },
    {
      title: 'Private secret and database connectivity',
      text: 'Lambda reaches PostgreSQL through security-group-controlled VPC networking and retrieves credentials through a Secrets Manager interface endpoint without requiring a NAT Gateway only for secret access.',
    },
  ],
  security: [
    'API Gateway validates Cognito JWTs before protected Lambda functions run.',
    'Every tenant-scoped operation verifies an active membership for the authenticated user.',
    'Owner safeguards prevent demotion, removal, self-removal, or accidental tenant orphaning.',
    'Database credentials remain in AWS Secrets Manager and are never committed to Git.',
    'GitHub Actions uses OIDC and short-lived AWS STS credentials instead of permanent access keys.',
    'Runtime and deployment permissions are separated and scoped to their required resources.',
  ],
  resilience: [
    'Stateless Lambda functions scale independently with incoming API traffic.',
    'Standard response and error handling keeps API behavior consistent across handlers.',
    'Soft-deleted memberships preserve historical relationships without granting active access.',
    'CloudWatch logs, metrics, alarms, dashboards, and SNS notifications provide operational visibility.',
    'Automated tests and SAM validation reduce the chance of deploying authorization or infrastructure regressions.',
  ],
  deployment: [
    'Run formatting, linting, unit tests, coverage checks, and AWS SAM validation in continuous integration.',
    'Build the serverless application and package Lambda functions and the shared layer.',
    'Exchange the GitHub OIDC token for short-lived AWS credentials through AWS STS.',
    'Deploy the SAM application through CloudFormation using environment-specific parameters.',
    'Verify health, database connectivity, protected API behavior, logs, alarms, and dashboard data.',
  ],
  lessons: [
    'Multi-tenancy is an authorization boundary, not only a database relationship.',
    'Central permission helpers make security rules easier to review, test, and maintain.',
    'Private networking must account for both database traffic and the managed services a Lambda function depends on.',
    'A production-minded project includes tests, deployment identity, observability, runbooks, and cost decisions alongside application code.',
  ],
  metrics: [
    { value: '79', label: 'passing automated tests' },
    { value: '10', label: 'implemented API endpoints' },
    { value: '3', label: 'tenant roles enforced' },
    { value: '0', label: 'long-lived AWS deployment keys' },
  ],
  technologies: [
    'Python 3.13',
    'AWS SAM',
    'AWS Lambda',
    'API Gateway HTTP API',
    'Amazon Cognito',
    'PostgreSQL',
    'AWS Secrets Manager',
    'CloudWatch',
    'GitHub Actions',
    'OpenID Connect',
  ],
  architecture: 'clouddesk',
  evidence: [
    {
      label: 'Identity and authorization',
      title: 'JWT validation with tenant-level RBAC',
      text: 'Cognito authenticates users, API Gateway validates access tokens, and shared guards enforce membership, admin, and owner permissions.',
    },
    {
      label: 'Private data path',
      title: 'Lambda to Secrets Manager and PostgreSQL',
      text: 'VPC-enabled functions retrieve managed credentials over a private endpoint and connect to PostgreSQL through restricted security-group rules.',
    },
    {
      label: 'Delivery and operations',
      title: 'Tested, keyless, and observable deployment',
      text: 'Seventy-nine tests, SAM validation, GitHub OIDC, CloudWatch alarms, dashboards, and SNS notifications support repeatable operation.',
    },
  ],
}

export function registerCloudDeskPortfolio() {
  if (!caseStudies.some((project) => project.slug === clouddeskCaseStudy.slug)) {
    caseStudies.unshift(clouddeskCaseStudy)
  }

  caseStudies.forEach((project, index) => {
    project.number = String(index + 1).padStart(2, '0')
  })

  for (let index = archiveProjects.length - 1; index >= 0; index -= 1) {
    if (archiveProjects[index].name === clouddeskCaseStudy.name) {
      archiveProjects.splice(index, 1)
    }
  }

  const currentStage = journey.find((stage) => stage.label === 'Stage 04')

  if (currentStage) {
    Object.assign(currentStage, {
      period: '2026',
      title: 'Serverless multi-tenant SaaS engineering',
      text: 'Built a serverless SaaS backend with Cognito identity, tenant-level RBAC, Lambda, PostgreSQL, automated testing, secure deployment, and AWS-native observability.',
      technologies: ['Python', 'AWS SAM', 'Lambda', 'Cognito', 'PostgreSQL', 'GitHub Actions'],
    })
  }
}
