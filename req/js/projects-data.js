window.projectCaseStudies = [
  {
    id: 'crammm',
    title: 'AWS Cloud Infrastructure — Zero to Production',
    summary: 'A 10-stack CloudFormation architecture that took an ed-tech platform from a local prototype to a scalable, multi-environment production system on AWS.',
    description: 'Fully automated Infrastructure-as-Code build covering networking, container orchestration, caching, storage, and CI/CD for a platform with no prior production environment.',
    tags: ['AWS', 'CloudFormation', 'ECS', 'Docker', 'DynamoDB', 'Lambda', 'Security', 'CodePipeline', 'CodeBuild', 'CodeDeploy', 'CloudWatch', 'S3', 'CloudFront', 'Route 53'],
    cardImage: './req/img/crammm.com.png',
    caseStudyImage: './req/img/architecture-diagram.png',
    caseStudy: {
      overview: 'Cramm is an AI-powered exam-prep platform — a React frontend, a real-time WebSocket layer, document OCR processing, and an API backed by Claude AI — that had no home in production. I designed and built the entire AWS foundation from scratch: networking, container orchestration, caching, storage, and CI/CD, as fully automated Infrastructure-as-Code, repeatable across dev, staging, and production with a single parameter change.',
      architecture: 'User traffic hits CloudFront, which serves the React frontend out of S3. API and WebSocket requests route through an Application Load Balancer to ECS services running on auto-scaling EC2 instances. Application data lives in DynamoDB, hot data is cached in Valkey, and shared files sit on EFS across every container. Docker images build in CodeBuild, land in ECR, and roll out to ECS automatically whenever code merges to GitHub.',
      role: 'Cloud Infrastructure Engineer. Designed the full AWS architecture across 10 interdependent CloudFormation stacks — VPC, IAM, EFS, ElastiCache, S3, ECR, DynamoDB, ECS cluster, ECS services, and SSM — and defined the deployment order and dependency chain between them. Owned the infrastructure end-to-end, from network design through to the CI/CD pipeline that ships containers to production.',
      flow: 'VPC & IAM deploy first → EFS, ElastiCache, S3, ECR deploy in parallel → DynamoDB (43+ tables) provisions via a nested stack → ECS cluster & ALB come online → API and Socket services deploy behind the load balancer → SSM wires up secrets and config. Ongoing: GitHub push → CodePipeline builds via CodeBuild → image lands in ECR → ECS rolls out with zero downtime.',
      challenges: 'Stateless ECS tasks scale independently, so real-time WebSocket sessions couldn\'t live in memory — connection tracking moved into Valkey so any task could serve any client. Getting access patterns and GSIs right across 43+ DynamoDB tables before launch mattered, to avoid expensive re-modeling later. Sequencing 19 interdependent CloudFormation stacks so later stacks could reliably consume earlier outputs without circular dependencies was its own puzzle, on top of balancing cost against resilience when sizing instances and deciding where Multi-AZ redundancy was actually worth it.',
      results: 'Replaced a nonexistent deployment process with a fully automated, repeatable one — infrastructure that spins up from code in under an hour (~50 min) and ships new releases with zero manual intervention (~2 min rollout, zero downtime) across 3 environments.',
      stack: ['AWS', 'CloudFormation', 'ECS', 'Docker', 'DynamoDB', 'Lambda', 'Security', 'CodePipeline', 'CodeBuild', 'CodeDeploy', 'CloudWatch', 'S3', 'CloudFront', 'Route 53', 'ElastiCache (Valkey)', 'EFS', 'SSM', 'secrets management']
    }
  },
  {
    id: 'CI/CD Pipeline — From Commit to Production',
    title: 'CI/CD Pipeline — From Commit to Production',
    summary: 'A solo-built pipeline that turned manual, error-prone deployments into an automated path from code commit to live containers.',
    description: 'End-to-end CI/CD pipeline handling automated builds, container registry pushes, and reverse-proxy deployment for a company with no prior DevOps setup.',
    tags: ['CI/CD', 'Docker', 'Jenkins', 'AWS', 'Nginx', 'Git', 'GitHub'],
    cardImage: './req/img/devops_cicd_pipeline_architecture.png',
    caseStudyImage: './req/img/crammm-ci-cd-first.png',
    caseStudy: {
      overview: 'Before this project, the company had no centralized codebase and no automated deployment process — everything was manual. I built a full CI/CD pipeline from scratch: centralized version control, automated builds, containerized deployments, and a reverse proxy in front — all designed, built, and maintained solo.',
      architecture: 'Code pushed to GitHub triggers Jenkins, which builds the frontend and backend independently and pushes both as Docker images to AWS ECR. Containers are deployed from those images and sit behind Nginx, which handles reverse-proxy routing to a single entry point.',
      role: 'DevOps Engineer — sole owner of this project. No team, no handoffs. I made every decision on tooling, pipeline structure, and failure handling, and debugged every issue independently.',
      flow: 'GitHub push → Jenkins build triggered → frontend and backend build in parallel → images pushed to ECR → containers deployed → Nginx routes traffic to the right service.',
      challenges: 'Frontend and backend builds were blocking each other early on, so I split them into independent Jenkins stages. Securing ECR credentials, tagging images properly for safe rollbacks, and getting Nginx routing/CORS right between the two services were the other big ones — all solved through direct trial, error, and no one else to check my work against.',
      results: 'Replaced a fully manual deployment process with a repeatable, automated pipeline — code merged to GitHub now reaches production without anyone touching a server by hand.',
      stack: ['GitHub', 'Git', 'Jenkins', 'Docker', 'AWS ECR', 'Nginx', 'CI/CD', 'Aws EC2']
    }
  },
  /*
  {
    id: 'secure-release-gateway',
    title: 'Secure Release Gateway',
    summary: 'A controlled deployment framework that made releases safer, repeatable, and easier to audit.',
    description: 'Release governance layer that standardizes deployments and strengthens compliance across delivery workflows.',
    tags: ['Security', 'Governance', 'IaC', 'Release Automation'],
    cardImage: 'https://via.placeholder.com/400x250/1a1a2e/00d4ff?text=Secure+Release+Gateway',
    caseStudyImage: 'https://via.placeholder.com/800x450/0f172a/38bdf8?text=Secure+Release+Gateway+Case+Study',
    caseStudy: {
      overview: 'The case study focused on introducing a governance-first path for shipping changes across environments while keeping releases safe and auditable.',
      architecture: 'The solution combined Infrastructure as Code, policy checks, and approval stages to enforce consistency across every deployment step.',
      role: 'I owned infrastructure automation, policy controls, and deployment reliability practices across the solution.',
      flow: 'The deployment flow used Infrastructure as Code, policy checks, and approval stages to keep every release consistent and auditable.',
      challenges: 'We had to balance developer speed with security, auditability, and environment consistency across multiple stages.',
      results: 'The process became more repeatable and easier to audit, while reducing deployment friction and improving confidence.',
      stack: ['Terraform', 'Azure', 'Python', 'Security', 'IaC', 'Automation']
    }
  },
  {
    id: 'project-4',
    title: 'Your Project Title 4',
    summary: 'A backend-driven product focused on automation, performance, and dependable service delivery for busy teams.',
    description: 'Brief description of your project. Highlight the key features, technologies used, and the impact it creates.',
    tags: ['Node.js', 'MongoDB', 'Jenkins', 'Linux'],
    cardImage: 'https://via.placeholder.com/400x250/1a1a2e/00d4ff?text=Your+Project+4',
    caseStudyImage: 'https://via.placeholder.com/800x450/0f172a/38bdf8?text=Project+4+Case+Study',
    caseStudy: {
      overview: 'This case study can be customized later with a more detailed project story.',
      architecture: 'Add the architecture context for this project here.',
      role: 'Add your role and responsibilities for this project here.',
      flow: 'Add the deployment flow for this project here.',
      challenges: 'Add the main challenges for this project here.',
      results: 'Add the measurable outcomes for this project here.',
      stack: ['Node.js', 'MongoDB', 'Jenkins', 'Linux']
    }
  },
  {
    id: 'project-5',
    title: 'Your Project Title 5',
    summary: 'An observability-focused initiative that helped teams monitor system health and respond faster to production issues.',
    description: 'Brief description of your project. Highlight the key features, technologies used, and the impact it creates.',
    tags: ['Ansible', 'Prometheus', 'Grafana', 'Observability'],
    cardImage: 'https://via.placeholder.com/400x250/1a1a2e/00d4ff?text=Your+Project+5',
    caseStudyImage: 'https://via.placeholder.com/800x450/0f172a/38bdf8?text=Project+5+Case+Study',
    caseStudy: {
      overview: 'This case study can be customized later with a more detailed project story.',
      architecture: 'Add the architecture context for this project here.',
      role: 'Add your role and responsibilities for this project here.',
      flow: 'Add the deployment flow for this project here.',
      challenges: 'Add the main challenges for this project here.',
      results: 'Add the measurable outcomes for this project here.',
      stack: ['Ansible', 'Prometheus', 'Grafana', 'Observability']
    }
  },
  {
    id: 'project-6',
    title: 'Your Project Title 6',
    summary: 'A GitOps-oriented project focused on delivering consistent infrastructure and application updates through automation.',
    description: 'Brief description of your project. Highlight the key features, technologies used, and the impact it creates.',
    tags: ['Helm', 'ArgoCD', 'Kube', 'GitOps'],
    cardImage: 'https://via.placeholder.com/400x250/1a1a2e/00d4ff?text=Your+Project+6',
    caseStudyImage: 'https://via.placeholder.com/800x450/0f172a/38bdf8?text=Project+6+Case+Study',
    caseStudy: {
      overview: 'This case study can be customized later with a more detailed project story.',
      architecture: 'Add the architecture context for this project here.',
      role: 'Add your role and responsibilities for this project here.',
      flow: 'Add the deployment flow for this project here.',
      challenges: 'Add the main challenges for this project here.',
      results: 'Add the measurable outcomes for this project here.',
      stack: ['Helm', 'ArgoCD', 'Kubernetes', 'GitOps']
    }
  }
  */
];
