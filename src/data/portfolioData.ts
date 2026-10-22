import { Project, SkillCategory, ExperienceItem, ServiceItem } from './types';

export const personalInfo = {
  name: "Saurav Kumar Mishra",
  headline: "Senior Full-Stack Solutions Engineer & Software Architect",
  tagline: "Turning Complex Business Requirements into Scalable, Production-Ready Software",
  subheadline: "You bring the requirements — I design, architect, and ship the complete software solution. From modern Next.js/React SaaS platforms and Angular enterprise web apps to Dynamics AX ERP integrations, high-throughput ETL pipelines, and healthcare interoperability engines.",
  email: "sauravmishra8333@gmail.com",
  phone: "+91 8873429550",
  whatsappUrl: "https://wa.me/918873429550?text=Hi%20Saurav,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
  linkedinUrl: "https://www.linkedin.com/in/saurav-mishra-b7b82b184",
  location: "Delhi, India (Open for Remote Worldwide & Hybrid/Consulting)",
  availability: "Available for New Projects & Contracts",
  yearsExperience: "5+",
  projectsDelivered: "10+",
  domainsCovered: "6+"
};

export const metricsData = [
  { value: "5+ Years", label: "Production Experience", detail: "Delivering enterprise & web systems" },
  { value: "6+ Domains", label: "Cross-Industry Breadth", detail: "InsurTech, Consumer Tech, ERP, Healthcare" },
  { value: "40% Faster", label: "Delivery Velocity", detail: "Powered by AI-Augmented Workflows" },
  { value: "99.8%", label: "Pipeline Reliability", detail: "High-throughput data parsing & ETL" },
];

export const projectsData: Project[] = [
  {
    id: "insure-track",
    title: "InsureTrack — Insurance Expiry & Follow-up SaaS Platform",
    subtitle: "Modern policy tracking, automated Excel data import, and renewal intelligence platform.",
    category: "saas",
    categoryLabel: "InsurTech / SaaS",
    role: "Full-Stack Solutions Architect",
    timeline: "Production Ready",
    tags: ["Next.js (App Router)", "React 19", "ASP.NET Core", "Clean Architecture", "SQL Server", "Docker", "Tailwind CSS"],
    metrics: [
      { label: "Deployment", value: "Dockerized" },
      { label: "Architecture", value: "Clean Architecture" },
      { label: "Auth", value: "JWT + BCrypt" }
    ],
    problem: "Insurance brokers and agencies face high policy churn and missed renewals due to fragmented spreadsheets, manual follow-ups, duplicate entries, and lack of prioritized alerts.",
    solution: [
      "Engineered an interactive Next.js (React 19) dashboard displaying real-time policy breakdown charts, expiry trend graphs, and prioritized risk tiers (Critical, High, Medium, Low).",
      "Built a high-performance Excel Import & Validation Engine supporting custom column mapping, duplicate detection, and automated data health checks.",
      "Implemented a bulletproof ASP.NET Core Clean Architecture backend with Domain, Application, Infrastructure, and API separation, ensuring zero business logic coupling.",
      "Packaged the entire stack into Docker Compose for instant zero-dependency deployment."
    ],
    features: [
      "Real-time KPI dashboard with interactive charts (policies by insurer, upcoming expiries)",
      "Automated follow-up scheduling with status tracking and audit history logs",
      "Dynamic Excel import with column-to-field mapper and duplicate detection",
      "Data quality analysis identifying missing customer phone numbers and policy records",
      "Role-based secure authentication with BCrypt hashing"
    ],
    techStack: {
      frontend: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS", "Recharts", "React Hook Form"],
      backend: ["ASP.NET Core Web API (.NET 10)", "C#", "Clean Architecture Pattern", "Entity Framework Core"],
      database: ["Microsoft SQL Server", "T-SQL Stored Procedures"],
      devops: ["Docker", "Docker Compose", "Serilog"]
    },
    highlights: [
      "Zero-latency client transitions using Next.js App Router and React 19 server/client components",
      "Strict Clean Architecture preventing technical debt and facilitating painless unit testing",
      "End-to-end containerized orchestration"
    ],
    demoType: "poc"
  },
  {
    id: "tv-service-portal",
    title: "Omnichannel TV Service Portal with WhatsApp Cloud API",
    subtitle: "End-to-end product QR scanner, simulated chat state-machine, Meta WhatsApp integration, and admin dispatch.",
    category: "integration",
    categoryLabel: "Consumer Tech / Omnichannel",
    client: "Consumer Electronics & Logistics",
    role: "Lead Full-Stack Engineer",
    timeline: "POC to Production Architecture",
    tags: ["Next.js 16", "React 19", "ASP.NET Core 10", "Meta WhatsApp API", "SQL Server", "xUnit", "Vitest"],
    metrics: [
      { label: "Channel Agnostic", value: "WebChat + WhatsApp" },
      { label: "Test Coverage", value: "xUnit + Vitest" },
      { label: "Customer Journey", value: "QR to Dispatch" }
    ],
    problem: "Consumer electronics brands lose customers and overwhelm support hotlines due to cumbersome telephone-based warranty registration and manual technician dispatch.",
    solution: [
      "Architected a frictionless customer journey: Product QR Code Scan -> Interactive Chat Assistant -> PIN code/location validation -> SQL Server request record -> Admin tracking console.",
      "Designed a pure conversation state machine capable of operating both in-browser and behind serverless webhooks.",
      "Integrated with Meta's official WhatsApp Cloud API for bidirectional automated messaging.",
      "Built an admin management console with technician assignment, lifecycle audit trails, and built-in API rate limiting."
    ],
    features: [
      "Dynamic conversation state machine handling demo, installation, and service requests",
      "Direct integration with Meta WhatsApp Cloud API webhooks",
      "Admin management console with live status updates, filtering, and audit history",
      "Built-in API rate limiting and standard RFC 7807 ProblemDetails error handling",
      "Complete test suite with xUnit integration tests and Vitest UI tests"
    ],
    techStack: {
      frontend: ["Next.js 16", "React 19", "Tailwind CSS 4", "QRCode", "Vitest"],
      backend: ["ASP.NET Core 10 Web API", "Modular Monolith", "JWT Bearer Auth", "Entity Framework Core 10"],
      database: ["Microsoft SQL Server", "SQLite (for in-memory testing)"],
      integrations: ["Meta WhatsApp Cloud API", "RESTful Webhooks"]
    },
    highlights: [
      "Customer raises verified service requests in under 60 seconds",
      "Channel-agnostic request architecture: works seamlessly on web chat or WhatsApp",
      "Automated CI/CD-ready test suites ensuring rock-solid stability"
    ],
    demoType: "poc"
  },
  {
    id: "dynamics-ax-etl",
    title: "Enterprise Dynamics AX 2012 R3 ERP Data Extraction & SSIS ETL",
    subtitle: "Automated ERP data warehousing, high-frequency ETL worker services, and executive reporting mart.",
    category: "enterprise",
    categoryLabel: "Enterprise ERP / Big Data",
    client: "Jaina Group (Supply Chain & Retail Operations)",
    role: "Senior Enterprise Integration Engineer",
    timeline: "Production Enterprise System",
    tags: ["Dynamics AX 2012 R3", "C# Worker Services", "SSIS", "SSRS", "T-SQL", "SQL Server"],
    metrics: [
      { label: "Data Accuracy", value: "100% Financial Grade" },
      { label: "ETL Frequency", value: "Automated Daily/Hourly" },
      { label: "System Impact", value: "Zero ERP Locking" }
    ],
    problem: "A national enterprise running Microsoft Dynamics AX 2012 R3 required heavy transaction extraction and operational reporting without locking transactional tables or slowing live ERP users.",
    solution: [
      "Architected and deployed high-performance ETL pipelines extracting data from Dynamics AX into an optimized reporting mart.",
      "Engineered automated C# .NET Worker Services and SSIS packages for automated incremental loads and reconciliation.",
      "Crafted performance-tuned T-SQL stored procedures, partitioned staging tables, and automated error-recovery routines.",
      "Designed real-time executive and inventory status dashboards using SQL Server Reporting Services (SSRS)."
    ],
    features: [
      "Automated incremental extraction from Dynamics AX ERP database",
      "SSIS package orchestration with dynamic configuration and comprehensive logging",
      "Reconciliation engines ensuring financial-grade balance matching between ERP and Data Mart",
      "Executive and regional sales dashboards with automated email distribution via SSRS"
    ],
    techStack: {
      backend: ["C# .NET Worker Services", ".NET 8"],
      database: ["Microsoft SQL Server", "T-SQL Stored Procedures & Views", "Query Optimization"],
      integrations: ["Microsoft Dynamics AX 2012 R3", "SSIS (SQL Server Integration Services)", "SSRS"]
    },
    highlights: [
      "Eliminated transaction bottlenecks on core ERP database during peak reporting hours",
      "Automated manual data compilation that previously took finance teams 4+ hours daily",
      "Built resilient error-handling and automated alert notifications on pipeline failures"
    ],
    demoType: "enterprise"
  },
  {
    id: "sansui-karbonn-crm",
    title: "National Enterprise CRM Platform (Sansui & Karbonn)",
    subtitle: "Centralized customer lifecycle, multi-brand warranty, and authorized service center network.",
    category: "enterprise",
    categoryLabel: "Enterprise CRM",
    client: "Jaina Group (Sansui, Karbonn Consumer Electronics)",
    role: "Software Developer & Technical Consultant",
    timeline: "Enterprise Production",
    tags: ["ASP.NET MVC", "C#", "SQL Server", "T-SQL", "SSRS", "Bootstrap"],
    metrics: [
      { label: "Resolution Time", value: "-25% Turnaround" },
      { label: "Service Centers", value: "1,000+ Integrated" },
      { label: "Availability", value: "99.9% Uptime" }
    ],
    problem: "Managing warranty claims, spare parts inventory, and technician assignments across thousands of independent third-party service centers nationwide with zero centralized visibility.",
    solution: [
      "Developed modular web CRM interfaces for multi-tier user hierarchies (Head Office, Regional Hubs, Local Service Centers).",
      "Engineered high-capacity SQL Server transactional schemas, stored procedures, and concurrency controls.",
      "Decreased average ticket resolution turnaround time by 25% through automated ticket routing.",
      "Built automated daily operations tracking and service KPI reports using SSRS."
    ],
    features: [
      "Multi-brand warranty validation and automated ticket creation",
      "Field technician assignment and spare parts inventory tracking",
      "Role-based security across national service center network",
      "Automated operational reporting for regional managers and executive leadership"
    ],
    techStack: {
      frontend: ["JavaScript", "jQuery", "Bootstrap", "HTML5/CSS3"],
      backend: ["ASP.NET MVC", "C#", "ADO.NET", "Entity Framework"],
      database: ["Microsoft SQL Server", "T-SQL", "SSRS"]
    },
    highlights: [
      "Consolidated fragmented service operations across India into a single source of truth",
      "Supported massive promotional surges during national festive retail seasons with zero downtime"
    ],
    demoType: "enterprise"
  },
  {
    id: "renal-care-ehr",
    title: "Advanced Renal Care EHR & Dialysis Management Platform",
    subtitle: "Mission-critical Electronic Health Record system powering multi-clinic dialysis workflows.",
    category: "healthcare",
    categoryLabel: "Healthcare IT / Clinical EHR",
    client: "American Renal Associates (via Renesan Software)",
    role: "Senior .NET & Angular Developer",
    timeline: "Production Healthcare Platform",
    tags: ["Angular", "C#", ".NET Core", "SQL Server", "Crystal Reports", "REST APIs"],
    metrics: [
      { label: "Query Latency", value: "-35% Faster" },
      { label: "Compliance", value: "HIPAA Conscious" },
      { label: "Domain", value: "US Renal Clinics" }
    ],
    problem: "High-stress clinical environments require instant, zero-latency access to dialysis logs, patient telemetry, medication orders, and chair schedules without risk of data collisions.",
    solution: [
      "Architected modular .NET Core RESTful APIs managing patient clinical records and vitals asynchronously.",
      "Built an intuitive Angular frontend providing real-time chair scheduling and reactive treatment charting forms.",
      "Optimized transactional queries and stored procedures, achieving a 35% reduction in record retrieval time.",
      "Generated HIPAA-compliant clinical documentation and analytical reports using Crystal Reports."
    ],
    features: [
      "Real-time chair allocation and dialysis treatment tracking",
      "Patient vitals documentation with live validation and warning alerts",
      "Dialyzer reuse management and medication administration records",
      "Dynamic clinical analytics reports for nephrologists and clinic administrators"
    ],
    techStack: {
      frontend: ["Angular (TypeScript)", "RxJS", "Angular Material / Bootstrap"],
      backend: ["C#", ".NET Core Web APIs", "Entity Framework Core"],
      database: ["Microsoft SQL Server", "T-SQL", "Crystal Reports"]
    },
    highlights: [
      "Powers day-to-day operations for dialysis clinics across the United States",
      "Zero clinical data corruption across hundreds of thousands of treatment records"
    ],
    demoType: "enterprise"
  },
  {
    id: "hl7-integration-engine",
    title: "High-Throughput HL7 v2 Data Interoperability Engine",
    subtitle: "Custom-built healthcare middleware for automated lab result parsing and hospital data interchange.",
    category: "healthcare",
    categoryLabel: "Healthcare Interoperability",
    role: "Backend Software Architect",
    timeline: "Core Healthcare Infrastructure",
    tags: ["C#", ".NET Core", "HL7 v2.x", "Background Workers", "SQL Server", "T-SQL"],
    metrics: [
      { label: "Parsing Success", value: "99.8% Accuracy" },
      { label: "Sync Latency", value: "Sub-Minute" },
      { label: "Cost Savings", value: "Zero 3rd-Party Fees" }
    ],
    problem: "Connecting outpatient clinics with disparate external hospital networks and commercial diagnostic labs resulted in manual data re-entry errors and high licensing costs for commercial interface engines.",
    solution: [
      "Engineered a lightweight, high-speed HL7 v2 parsing and validation middleware from the ground up in C# and .NET Core.",
      "Designed continuous background worker processes with automated segment validation, queueing, and transactional rollback.",
      "Eliminated expensive recurring third-party middleware licensing costs while achieving 99.8% parsing success across thousands of daily lab feeds."
    ],
    features: [
      "Custom parsing of HL7 v2 ADT, ORU, and MDM message formats",
      "Automated laboratory test code mapping to internal clinical databases",
      "Dead-letter queues and automated error notification for malformed external payloads",
      "Transactional persistence ensuring zero message loss"
    ],
    techStack: {
      backend: ["C#", ".NET Core", "Background Worker Services", "HL7 v2 Standard"],
      database: ["Microsoft SQL Server", "T-SQL Stored Procedures"]
    },
    highlights: [
      "Transformed multi-hour manual data entry into instant sub-minute automated ingestion",
      "Handled extreme variation in external lab formatting with flexible schema adaptors"
    ],
    demoType: "enterprise"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    iconName: "Layout",
    description: "Building responsive, snappy, and accessible user interfaces.",
    skills: [
      { name: "React 19 & Next.js (App Router)", level: "Expert", hot: true },
      { name: "Angular (v14 – v18)", level: "Expert", hot: true },
      { name: "TypeScript & Modern JavaScript", level: "Expert", hot: true },
      { name: "Tailwind CSS & Modern SCSS", level: "Expert", hot: true },
      { name: "RxJS & Reactive Forms", level: "Expert" },
      { name: "State Management & Component Architecture", level: "Expert" },
      { name: "HTML5, CSS3 & Responsive UI", level: "Expert" },
      { name: "Vitest & Client-side Testing", level: "Advanced" }
    ]
  },
  {
    title: "Backend & Systems Architecture",
    iconName: "Server",
    description: "Architecting high-throughput, maintainable, and clean backend services.",
    skills: [
      { name: "C# & .NET Core (.NET 6 / 7 / 8 / 10)", level: "Expert", hot: true },
      { name: "ASP.NET Core Web API", level: "Expert", hot: true },
      { name: "Clean Architecture & Modular Monoliths", level: "Expert", hot: true },
      { name: "Entity Framework Core & Dapper", level: "Expert" },
      { name: "Python (FastAPI, Flask, Automation)", level: "Advanced", hot: true },
      { name: "RESTful API Design & Versioning", level: "Expert" },
      { name: "Worker Services & Background Tasks", level: "Expert" },
      { name: "xUnit & Integration Testing", level: "Expert" }
    ]
  },
  {
    title: "Databases & ETL Pipelines",
    iconName: "Database",
    description: "Designing resilient relational data models and automated data integration.",
    skills: [
      { name: "Microsoft SQL Server (2015 – 2021)", level: "Expert", hot: true },
      { name: "Complex T-SQL & Stored Procedures", level: "Expert", hot: true },
      { name: "Query Optimization & Index Tuning", level: "Expert", hot: true },
      { name: "SSIS (SQL Server Integration Services)", level: "Expert" },
      { name: "SSRS & Crystal Reports", level: "Expert" },
      { name: "Data Warehousing & Staging Marts", level: "Advanced" },
      { name: "Excel Data Import/Export Engines", level: "Expert" }
    ]
  },
  {
    title: "Enterprise & Domain Integrations",
    iconName: "Network",
    description: "Connecting enterprise ERPs, clinical protocols, and communication channels.",
    skills: [
      { name: "Microsoft Dynamics AX 2012 R3 ERP", level: "Advanced", hot: true },
      { name: "HL7 v2.x Healthcare Standard", level: "Expert", hot: true },
      { name: "Meta WhatsApp Cloud API", level: "Expert", hot: true },
      { name: "EHR / EMR Clinical Workflows", level: "Expert" },
      { name: "Webhooks & Third-Party APIs", level: "Expert" },
      { name: "JWT Auth & Role-Based Access Control", level: "Expert" }
    ]
  },
  {
    title: "DevOps, Cloud & AI Acceleration",
    iconName: "Cpu",
    description: "Modern deployment workflows and AI-boosted development speed.",
    skills: [
      { name: "Docker & Docker Compose", level: "Expert", hot: true },
      { name: "AI-Augmented Engineering (Claude, Copilot, Agentic AI)", level: "Expert", hot: true },
      { name: "Microsoft Azure (App Services, SQL)", level: "Advanced" },
      { name: "Git, GitHub & Azure DevOps CI/CD", level: "Expert" },
      { name: "Postman & API Documentation", level: "Expert" }
    ]
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: "custom-saas",
    title: "End-to-End Custom Web Applications & SaaS",
    shortDesc: "From your product idea or requirements doc to a production-ready cloud web application.",
    fullDesc: "I build complete, responsive, full-stack web applications tailored to your exact business specifications. You don't need separate frontend and backend engineers—I deliver polished user interfaces paired with secure, performant backend APIs.",
    iconName: "Globe",
    deliverables: [
      "Modern Single Page App (Next.js / React 19 or Angular 18)",
      "High-performance REST API with authentication & role-based permissions",
      "Relational database schema with optimized indexing",
      "Dockerized setup ready for one-click cloud hosting"
    ],
    typicalStack: "Next.js / React 19 or Angular + .NET Core Web API + SQL Server + Docker"
  },
  {
    id: "enterprise-integration",
    title: "Enterprise Systems, ERP & API Integration",
    shortDesc: "Bridge disjointed systems, modernize legacy workflows, and automate business processes.",
    fullDesc: "Specialized in integrating enterprise platforms such as Microsoft Dynamics AX 2012 R3, building custom ETL pipelines (SSIS / .NET Worker Services), connecting WhatsApp Cloud API, and bridging third-party cloud services.",
    iconName: "Boxes",
    deliverables: [
      "Custom middleware, background workers, and webhook handlers",
      "Automated data extraction and sync between ERP, CRM, and databases",
      "Interactive messaging channels (WhatsApp, SMS, Email)",
      "Comprehensive error auditing and automatic rollback"
    ],
    typicalStack: "C# .NET Worker Services + SSIS + T-SQL + Webhooks / Cloud APIs"
  },
  {
    id: "healthcare-it",
    title: "Healthcare IT & HL7 Clinical Interoperability",
    shortDesc: "HIPAA-conscious EHR modules, dialysis management, and custom HL7 data ingestion.",
    fullDesc: "Deep healthcare domain expertise designing clinical workflows, Electronic Health Records (EHR), treatment tracking, and bespoke HL7 v2 parsing engines that seamlessly integrate hospital and laboratory data.",
    iconName: "HeartPulse",
    deliverables: [
      "Clinical charting, patient scheduling, and treatment tracking modules",
      "Custom HL7 v2 parser (ADT, ORU, MDM) eliminating 3rd-party licensing fees",
      "Automated lab result mapping and validation",
      "Clinical analytics and compliance reporting (Crystal Reports / SSRS)"
    ],
    typicalStack: ".NET Core + Angular + HL7 v2 + SQL Server + Crystal Reports"
  },
  {
    id: "database-optimization",
    title: "Database Engineering & Performance Optimization",
    shortDesc: "Rescue sluggish databases, refactor complex T-SQL, and build executive reporting marts.",
    fullDesc: "Overcome database bottlenecks, lockups, and slow query execution. I profile query plans, design optimal indexes, partition large tables, and build automated reporting solutions using SSRS and Crystal Reports.",
    iconName: "Database",
    deliverables: [
      "Query profiling, deadlock remediation, and index strategy tuning",
      "Stored procedure refactoring and transactional optimization",
      "Automated ETL data pipelines and staging marts",
      "Automated executive BI dashboards and scheduled reports"
    ],
    typicalStack: "Microsoft SQL Server + T-SQL + SSRS + SSIS"
  },
  {
    id: "legacy-modernization",
    title: "Legacy Modernization & Code Refactoring",
    shortDesc: "Upgrade legacy .NET Framework or monoliths to modern, modular, cloud-ready architectures.",
    fullDesc: "Migrate older .NET Framework (4.x) or monolithic applications to high-performance .NET Core / .NET 8 without business disruption. Powered by AI-assisted tooling, I accelerate code migration and unit test coverage.",
    iconName: "RefreshCw",
    deliverables: [
      "Monolith-to-modular architecture transition plan",
      "Upgraded dependencies and modern C# features",
      "Containerization using Docker for cloud portability",
      "Automated test coverage with xUnit"
    ],
    typicalStack: "C# .NET 8 / 10 + Clean Architecture + Docker + xUnit"
  }
];

export const experienceData: ExperienceItem[] = [
  {
    period: "July 2022 – Present",
    role: "Senior .NET & Full-Stack Solutions Engineer",
    company: "Renesan Software India Pvt. Ltd.",
    location: "Delhi, India",
    type: "Full-Time",
    description: "Lead full-stack engineering for mission-critical US healthcare applications, focusing on Electronic Health Records (EHR) and specialized Dialysis Management systems.",
    achievements: [
      "Architected a custom HL7 v2 data integration engine processing thousands of daily lab records with 99.8% parsing accuracy.",
      "Engineered responsive Angular interfaces and robust .NET Core RESTful APIs adhering to Clean Architecture.",
      "Optimized complex SQL Server stored procedures and transactional query plans, decreasing clinical lookup latency by 35%.",
      "Integrated AI-assisted engineering workflows (Claude, Copilot) to accelerate delivery cycles by 30-40% without compromising code quality."
    ],
    technologies: ["C#", ".NET Core", "Angular", "TypeScript", "HL7 v2", "SQL Server", "Crystal Reports", "Git"]
  },
  {
    period: "December 2020 – July 2022",
    role: "Software Developer & Technical Consultant",
    company: "Jaina Group / Jaina India Pvt. Ltd.",
    location: "Delhi, India",
    type: "Full-Time & Ongoing Consulting",
    description: "Developed and maintained national enterprise CRM systems and automated ERP integration pipelines for premier consumer brands including Sansui and Karbonn.",
    achievements: [
      "Designed and deployed enterprise CRM modules supporting national warranty, customer service, and technician dispatch across 1,000+ centers.",
      "Built high-throughput SSIS ETL data extraction pipelines bridging Microsoft Dynamics AX 2012 R3 ERP with SQL Server.",
      "Reduced customer complaint resolution time by 25% through automated workflow routing.",
      "Designed dynamic executive and operational reports using SQL Server Reporting Services (SSRS)."
    ],
    technologies: ["ASP.NET MVC", "C#", "Dynamics AX 2012 R3", "SSIS", "SSRS", "SQL Server", "T-SQL", "JavaScript"]
  },
  {
    period: "2023 – Present",
    role: "Independent Solutions Architect & Full-Stack Builder",
    company: "Freelance & Product Engineering",
    location: "Remote",
    type: "Contract / Project-Based",
    description: "Architecting and shipping end-to-end custom software solutions, modern SaaS prototypes, and automated business platforms.",
    achievements: [
      "Engineered InsureTrack: A modern InsurTech policy expiration & renewal management SaaS platform built with Next.js (React 19), .NET Clean Architecture, and Docker.",
      "Built TvServicePoc: An omnichannel service booking platform featuring a pure chat state machine and Meta WhatsApp Cloud API integration.",
      "Helped businesses modernize legacy data workflows and build scalable full-stack applications with fast time-to-market."
    ],
    technologies: ["Next.js", "React 19", ".NET 10", "Tailwind CSS", "Docker", "WhatsApp Cloud API", "Python"]
  }
];

export const clientProcessSteps = [
  {
    step: "01",
    title: "Requirements Discovery",
    desc: "We discuss your business goal, target users, must-have features, and system integrations. No fluff—just clear, actionable engineering specs."
  },
  {
    step: "02",
    title: "Architecture & Stack Selection",
    desc: "I deliver a transparent architectural plan: database schema, API design, tech stack choice (Next.js, Angular, .NET, Python), and sprint milestones."
  },
  {
    step: "03",
    title: "AI-Accelerated Sprint Delivery",
    desc: "Rapid agile development with frequent live demos and clean Git commits. Modern AI tools help eliminate boilerplate so we ship functional software fast."
  },
  {
    step: "04",
    title: "Testing, Hardening & Security",
    desc: "Automated test coverage (xUnit, Vitest), query profiling, security checks, and cross-browser responsiveness validation."
  },
  {
    step: "05",
    title: "Cloud Deployment & Handover",
    desc: "Containerized deployment (Docker, Azure, Vercel), complete documentation, and knowledge transfer so you retain 100% control of your software."
  }
];
