export type ProjectCategory = 'all' | 'saas' | 'enterprise' | 'healthcare' | 'integration';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  client?: string;
  role: string;
  timeline?: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string[];
  features: string[];
  techStack: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    devops?: string[];
    integrations?: string[];
  };
  highlights: string[];
  demoType: 'live' | 'poc' | 'enterprise';
  githubOrDocs?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: { name: string; level: 'Expert' | 'Advanced' | 'Proficient'; hot?: boolean }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  typicalStack: string;
}
