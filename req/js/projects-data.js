window.projectCaseStudies = [
  {
    id: 'crammm',
    title: 'crammm.com',
    summary: 'A student-first learning platform built around dependable releases, smart features, and a smoother study experience.',
    description: 'AI-assisted study platform that helps learners revise faster and collaborate better with a smoother experience.',
    tags: ['AI Study', 'Cloud Ops', 'DevSecOps', 'Scalable Delivery'],
    cardImage: './req/img/crammm.com.png',
    caseStudyImage: 'https://via.placeholder.com/800x450/0f172a/38bdf8?text=crammm.com+Case+Study',
    caseStudy: {
      overview: 'The case study focused on creating a dependable learning experience that felt fast, useful, and reliable from day one.',
      architecture: 'The platform was structured around containerized services, managed cloud hosting, automated delivery, and observability for consistent performance.',
      role: 'I shaped the cloud architecture, deployment backbone, and release reliability for the platform.',
      flow: 'The delivery flow moved from code commit to secure deployment through containerized builds, automated testing, and observability.',
      challenges: 'The team needed rapid iteration without sacrificing uptime, security, or maintainability as AI features expanded.',
      results: 'The platform gained stronger release confidence, better reliability, and a more polished user experience for learners.',
      stack: ['AWS', 'Docker', 'ECS', 'GitHub Actions', 'Terraform', 'Prometheus', 'Security']
    }
  },
  {
    id: 'CI/CD Pipeline — From Commit to Production',
    title: 'CI/CD Pipeline — From Commit to Production',
    summary: 'A solo-built pipeline that turned manual, error-prone deployments into an automated path from code commit to live containers.',
    description: 'End-to-end CI/CD pipeline handling automated builds, container registry pushes, and reverse-proxy deployment for a company with no prior DevOps setup.',
    tags: ['CI/CD', 'Docker', 'Jenkins', 'AWS', 'Nginx', 'Git', 'GitHub'],
    cardImage: 'https://via.placeholder.com/400x250/1a1a2e/00d4ff?text=Ops+Console',
    caseStudyImage: 'https://via.placeholder.com/800x450/0f172a/38bdf8?text=Ops+Console+Case+Study',
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
];
