export const siteUrl = 'https://simeonprimordial.github.io/SimeonOnTheCloudSpace/'

export const navigation = [
  { href: '#about', label: 'About' },
  { href: '#highlights', label: 'Highlights' },
  { href: '#journey', label: 'Journey' },
  { href: '#archive', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export const professionalSummary =
  'Cloud infrastructure engineer focused on AWS, Terraform, Linux, secure CI/CD, and highly available systems. Physics graduate with hands-on experience designing, deploying, securing, troubleshooting, and documenting production-oriented cloud architectures.'

export const caseStudies = [
  {
    slug: 'logihaul',
    number: '01',
    type: 'Architecture case study',
    name: 'LogiHaul Reference Architecture',
    period: '2026',
    repositoryUrl: 'https://github.com/simeonprimordial/logihaul-reference-architecture',
    demoStatus:
      'Architecture was designed and documented as a graded AWS capstone. A persistent public runtime is not maintained because the complete environment carries ongoing cloud cost.',
    summary:
      'A six-layer logistics platform designed around a 50x demand spike, with each workload assigned to the scaling and data model that fits it.',
    contribution:
      'Designed the multi-AZ architecture, private networking model, mixed relational and NoSQL data paths, asynchronous notifications, observability, and cross-region S3 replication strategy.',
    problem:
      'LogiHaul needed to support 5,000 drivers across 36 states, absorb unpredictable traffic spikes during promotions or flood events, survive an Availability Zone failure, and keep delivery confirmation responsive without scaling every subsystem in the same way.',
    responsibilities: [
      'Translated the scenario requirements into six infrastructure layers and explicit service boundaries.',
      'Designed public and private subnet placement across multiple Availability Zones.',
      'Separated order intake, tracking, billing, cache, notifications, and reporting by workload pattern.',
      'Documented cost, security, failure, capacity, and disaster-recovery decisions.',
    ],
    decisions: [
      {
        title: 'DynamoDB for spike-sensitive order intake',
        text: 'The 50x promotional spike lands on the most elastic request path, avoiding a relational database bottleneck for high-volume order writes.',
      },
      {
        title: 'RDS MySQL Multi-AZ for relational records',
        text: 'Driver and billing data remains relational and receives managed failover without paying the higher Aurora baseline for a workload that is not the primary spike path.',
      },
      {
        title: 'SQS between request and notification processing',
        text: 'The queue absorbs bursts and decouples user-facing requests from email and SMS delivery so downstream delays do not block order confirmation.',
      },
      {
        title: 'Cross-region S3 replication',
        text: 'Primary objects in af-south-1 replicate to eu-west-1 to create a separate regional recovery copy for reports and operational evidence.',
      },
    ],
    security: [
      'Private subnets for application, database, and cache tiers.',
      'Least-privilege IAM roles instead of broad administrator policies.',
      'Encrypted storage and restricted bucket access.',
      'Security groups that permit only required service-to-service paths.',
    ],
    resilience: [
      'Multi-AZ routing and compute placement reduce single-AZ dependency.',
      'Auto Scaling replaces unhealthy compute and expands the web tier during demand growth.',
      'DynamoDB and Lambda scale independently for the 50x event path.',
      'SQS buffers notification work when downstream processing slows.',
      'Cross-region S3 replication protects report objects from a regional event.',
    ],
    deployment: [
      'Build the custom VPC, route tables, public subnets, and private subnets.',
      'Deploy the load-balanced Auto Scaling web tier and confirm health checks.',
      'Provision RDS MySQL, DynamoDB, Redis, S3 replication, and serverless integrations.',
      'Create CloudWatch dashboards, alarms, logs, and an SNS notification path.',
      'Verify the architecture, document evidence, and record the trade-offs.',
    ],
    lessons: [
      'A traffic spike should not force every data store and compute service to use the same scaling model.',
      'Private networking improves security but also introduces routing, bootstrap, and dependency-planning responsibilities.',
      'Architecture evidence is strongest when capacity, cost, security, and recovery are treated as one design problem.',
    ],
    metrics: [
      { value: '50x', label: 'peak traffic scenario' },
      { value: '6', label: 'architecture layers' },
      { value: '2', label: 'AWS regions for S3 data' },
      { value: 'Multi-AZ', label: 'failure-domain design' },
    ],
    technologies: [
      'VPC',
      'Application Load Balancer',
      'Auto Scaling',
      'DynamoDB',
      'Lambda',
      'SQS',
      'RDS MySQL',
      'ElastiCache',
      'S3',
      'CloudWatch',
    ],
    architecture: 'logihaul',
    evidence: [
      {
        label: 'Architecture map',
        title: 'Six workload layers',
        text: 'Edge, compute, storage, relational data, event processing, and observability are shown as separate operating concerns.',
      },
      {
        label: 'Scale path',
        title: '50x spike isolation',
        text: 'Order intake scales through DynamoDB and Lambda while billing and driver records remain on the relational path.',
      },
      {
        label: 'Recovery path',
        title: 'Regional object copy',
        text: 'S3 replication copies protected objects from af-south-1 to eu-west-1 for disaster-recovery evidence.',
      },
    ],
  },
  {
    slug: 'fintrust',
    number: '02',
    type: 'Deployed system',
    name: 'FinTrust Customer Portal',
    period: '2026',
    repositoryUrl: 'https://github.com/simeonprimordial/fintrust-customer-portal',
    demoStatus:
      'The AWS environment was deployed and verified during the project. It is not kept permanently online so the portfolio does not require continuous EC2, load balancer, and database spend.',
    summary:
      'A containerized three-tier customer portal with repeatable infrastructure, private application and database layers, and managed credentials.',
    contribution:
      'Combined Terraform, Docker, ECR, load balancing, Auto Scaling, RDS, Secrets Manager, and automated validation into one documented delivery path.',
    problem:
      'FinTrust needed a repeatable way to deploy a web application, route traffic safely, replace unhealthy instances, isolate the database, and remove sensitive credentials from source-controlled configuration.',
    responsibilities: [
      'Defined the AWS network, load-balancing, compute, database, IAM, and secret-management resources in Terraform.',
      'Containerized the Flask workload and published images to Amazon ECR.',
      'Configured launch-template bootstrap logic for application deployment.',
      'Hardened secret management after identifying credential exposure risks.',
      'Added CI checks for Terraform, Bash, and Python changes.',
    ],
    decisions: [
      {
        title: 'Terraform for repeatability',
        text: 'Infrastructure is reviewed and reproduced from code instead of depending on undocumented console configuration.',
      },
      {
        title: 'Private application and database layers',
        text: 'Only the load balancer is internet-facing; compute and RDS remain on internal network paths.',
      },
      {
        title: 'RDS-managed credentials',
        text: 'Database credentials are managed through AWS Secrets Manager and retrieved through the EC2 role instead of being embedded in Terraform variables or user data.',
      },
      {
        title: 'Auto Scaling behind the ALB',
        text: 'Health-aware routing and instance replacement improve availability while allowing the compute tier to expand independently.',
      },
    ],
    security: [
      'Removed hardcoded database and application secrets from tracked configuration.',
      'Restricted secretsmanager:GetSecretValue to the required secret ARNs.',
      'Protected the generated environment file with root-only permissions.',
      'Excluded .env, Terraform state, and real tfvars files through .gitignore.',
      'Kept application and database resources off the public subnet path.',
    ],
    resilience: [
      'Application Load Balancer health checks route requests only to healthy targets.',
      'Auto Scaling replaces failed instances and maintains the desired capacity.',
      'Container images in ECR create a consistent application artifact.',
      'Managed RDS reduces database administration and supports a controlled relational tier.',
      'CI validates infrastructure, bootstrap, and application syntax before changes merge.',
    ],
    deployment: [
      'Build and tag the application container image.',
      'Push the image to Amazon ECR.',
      'Validate and apply the Terraform configuration.',
      'Allow the launch template to retrieve runtime secrets and start the container.',
      'Verify target health, application connectivity, and database access.',
    ],
    lessons: [
      'A secret removed from the latest commit can still exist in Git history and must be rotated.',
      'Bootstrap scripts are part of the security boundary because they handle credentials and application configuration.',
      'Infrastructure quality improves when Terraform, Bash, and application code are validated together.',
    ],
    metrics: [
      { value: '3-tier', label: 'application architecture' },
      { value: '0', label: 'hardcoded runtime secrets' },
      { value: '3', label: 'code types checked in CI' },
      { value: 'Private', label: 'app and database layers' },
    ],
    technologies: [
      'Terraform',
      'Docker',
      'Amazon ECR',
      'Application Load Balancer',
      'Auto Scaling',
      'Amazon RDS',
      'Secrets Manager',
      'IAM',
      'GitHub Actions',
    ],
    architecture: 'fintrust',
    evidence: [
      {
        label: 'Traffic path',
        title: 'Public edge, private runtime',
        text: 'The load balancer accepts traffic while containers and RDS remain on internal network paths.',
      },
      {
        label: 'Identity path',
        title: 'Managed secret retrieval',
        text: 'The EC2 role retrieves only the required secrets at startup and writes a protected runtime environment file.',
      },
      {
        label: 'Validation path',
        title: 'Terraform, Bash, and Python checks',
        text: 'Infrastructure and application changes are tested together before they are accepted.',
      },
    ],
  },
  {
    slug: 'novatech',
    number: '03',
    type: 'Secure delivery',
    name: 'NovaTech Serverless Website',
    period: '2026',
    repositoryUrl: 'https://github.com/simeonprimordial/novatech-serverless-website',
    demoStatus:
      'The CloudFront deployment was verified during implementation. The case study focuses on the delivery and identity design rather than promising a permanent demo endpoint.',
    summary:
      'A private-origin static website delivered through CloudFront and deployed from GitHub without storing long-lived AWS credentials.',
    contribution:
      'Implemented CloudFront Origin Access Control, GitHub Actions OIDC, least-privilege IAM, validation, S3 synchronization, cache invalidation, and operational documentation.',
    problem:
      'NovaTech needed global HTTPS delivery for a static site while keeping the S3 origin private and avoiding permanent AWS access keys in GitHub repository secrets.',
    responsibilities: [
      'Created a private S3 origin and CloudFront distribution using Origin Access Control.',
      'Configured GitHub as an OIDC identity provider for temporary AWS credentials.',
      'Created the deployment role and restricted its permissions to the required bucket and distribution actions.',
      'Automated validation, S3 synchronization, and CloudFront cache invalidation.',
      'Documented architecture, deployment, decisions, and troubleshooting.',
    ],
    decisions: [
      {
        title: 'CloudFront in front of a private S3 origin',
        text: 'Users receive global HTTPS delivery without granting public read access to the storage bucket.',
      },
      {
        title: 'Origin Access Control',
        text: 'CloudFront signs requests to S3 and becomes the intended access path for website objects.',
      },
      {
        title: 'GitHub Actions OIDC',
        text: 'The workflow exchanges GitHub identity for short-lived AWS credentials instead of storing access keys.',
      },
      {
        title: 'Cache invalidation after synchronization',
        text: 'The workflow explicitly refreshes CloudFront so approved site updates become visible after deployment.',
      },
    ],
    security: [
      'No long-lived AWS access keys are stored for deployment.',
      'The S3 bucket remains private and is accessed through CloudFront OAC.',
      'The IAM trust policy limits which GitHub repository and branch can assume the role.',
      'The permissions policy scopes S3 and CloudFront actions to the deployment resources.',
    ],
    resilience: [
      'CloudFront serves cached content from the edge and reduces direct origin dependency.',
      'S3 provides durable object storage for the static site.',
      'Automated invalidation prevents stale content from persisting after a successful deployment.',
      'The workflow can be rerun from source control without reconstructing manual steps.',
    ],
    deployment: [
      'Push an approved change to the main branch.',
      'Run HTML or site validation in GitHub Actions.',
      'Request a GitHub OIDC token and assume the AWS deployment role.',
      'Synchronize website files to the private S3 bucket.',
      'Create a CloudFront invalidation for the updated content.',
    ],
    lessons: [
      'CI/CD identity is part of the architecture, not only a workflow setting.',
      'Private origins and edge delivery can coexist without making the S3 bucket public.',
      'A deployment is incomplete until cache behavior and verification are considered.',
    ],
    metrics: [
      { value: '0', label: 'long-lived AWS keys' },
      { value: '1', label: 'private S3 origin' },
      { value: '3', label: 'automated delivery stages' },
      { value: 'Global', label: 'CloudFront delivery' },
    ],
    technologies: [
      'Amazon S3',
      'CloudFront',
      'Origin Access Control',
      'GitHub Actions',
      'OpenID Connect',
      'AWS STS',
      'IAM',
    ],
    architecture: 'novatech',
    evidence: [
      {
        label: 'Request path',
        title: 'CloudFront to private S3',
        text: 'End users never need direct public bucket access; CloudFront signs the origin request through OAC.',
      },
      {
        label: 'Identity path',
        title: 'GitHub OIDC to AWS STS',
        text: 'The workflow receives temporary credentials by assuming a role with web identity.',
      },
      {
        label: 'Delivery path',
        title: 'Validate, sync, invalidate',
        text: 'The pipeline checks the site, uploads only approved files, and refreshes the edge cache.',
      },
    ],
  },
]

export const journey = [
  {
    period: 'Foundation',
    title: 'AWS foundations and networking',
    label: 'Stage 01',
    text: 'Built practical understanding of IAM, VPCs, public and private subnets, routing, EC2, storage, and Linux administration through focused labs and small deployments.',
    technologies: ['AWS', 'Linux', 'IAM', 'VPC', 'Git'],
  },
  {
    period: '2026',
    title: 'Infrastructure as Code and resilient compute',
    label: 'Stage 02',
    text: 'Moved repeatable infrastructure into Terraform and combined load balancing, health checks, launch templates, and Auto Scaling into complete compute paths.',
    technologies: ['Terraform', 'ALB', 'Auto Scaling', 'RDS'],
  },
  {
    period: '2026',
    title: 'Containers and secure delivery automation',
    label: 'Stage 03',
    text: 'Added Docker, ECR, GitHub Actions, OIDC, managed secrets, and validation workflows so application and infrastructure changes can ship with less credential and configuration risk.',
    technologies: ['Docker', 'ECR', 'GitHub Actions', 'OIDC'],
  },
  {
    period: 'Current',
    title: 'Multi-tenant application foundations',
    label: 'Stage 04',
    text: 'Building identity, authorization, tenant context, and isolation into a Go-based SaaS foundation while continuing toward Cloud Infrastructure and DevOps Engineering roles.',
    technologies: ['Go', 'Cognito', 'OIDC', 'Multi-tenancy'],
  },
]

export const learning = [
  {
    kicker: 'Education',
    title: 'Bachelor of Science in Physics',
    detail:
      'A quantitative foundation in analysis, structured problem solving, and technical reasoning.',
  },
  {
    kicker: 'Current preparation',
    title: 'Preparing for AWS Certified Solutions Architect - Associate',
    detail:
      'Developing architecture judgment across resilience, security, performance, and cost optimization.',
  },
  {
    kicker: 'Structured practice',
    title: 'AWS 80 Projects Challenge',
    detail:
      'An evolving roadmap from cloud foundations to containers, observability, security, and disaster recovery.',
    url: 'https://github.com/simeonprimordial/AWS80ProjectsChallenge',
  },
]

export const archiveProjects = [
  ...caseStudies.map((project) => ({
    type: project.type,
    name: project.name,
    period: project.period,
    description: project.summary,
    technologies: project.technologies.slice(0, 5),
    caseStudySlug: project.slug,
  })),
  {
    type: 'SaaS architecture',
    name: 'CloudDesk Multi-Tenant SaaS',
    period: 'Active',
    description: 'Tenant-aware Go application foundation focused on identity and isolation.',
    technologies: ['Go', 'Cognito', 'OIDC', 'AWS'],
    url: 'https://github.com/simeonprimordial/clouddesk-multi-tenant-saas',
  },
  {
    type: 'High availability',
    name: 'Highly Available Web Application',
    period: '2026',
    description: 'Terraform-provisioned load balancing, health checks, and Auto Scaling.',
    technologies: ['Terraform', 'ALB', 'EC2', 'Auto Scaling'],
    url: 'https://github.com/simeonprimordial/highly-available-web-app-terraform',
  },
  {
    type: 'Containers',
    name: 'FinTrust NLB Docker Service',
    period: '2026',
    description: 'Containerized Flask service exposed through a Network Load Balancer.',
    technologies: ['Docker', 'Python', 'NLB', 'Linux'],
    url: 'https://github.com/simeonprimordial/fintrust-nlb-docker',
  },
  {
    type: 'Storage security',
    name: 'Lagos Law Firm S3 DMS',
    period: '2026',
    description: 'Encrypted document storage with lifecycle controls and presigned access.',
    technologies: ['S3', 'IAM', 'Encryption', 'Lifecycle'],
    url: 'https://github.com/simeonprimordial/lagos-lawfirm-s3-dms',
  },
  {
    type: 'Learning system',
    name: 'AWS 80 Projects Challenge',
    period: 'Ongoing',
    description: 'Central index documenting the progression of hands-on cloud builds.',
    technologies: ['AWS', 'Terraform', 'Docker', 'CI/CD'],
    url: 'https://github.com/simeonprimordial/AWS80ProjectsChallenge',
  },
]

export const skillGroups = [
  {
    title: 'Cloud architecture',
    skills: ['AWS', 'VPC design', 'Load balancing', 'Auto Scaling', 'Serverless', 'Resilience'],
  },
  {
    title: 'Delivery and operations',
    skills: ['Terraform', 'Docker', 'GitHub Actions', 'Linux', 'Bash', 'CloudWatch'],
  },
  {
    title: 'Security and documentation',
    skills: ['IAM', 'OIDC', 'Private networking', 'Secrets Manager', 'Diagrams', 'Runbooks'],
  },
]
