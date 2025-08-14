export interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  technologies: string[];
  features: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  images?: string[];
}