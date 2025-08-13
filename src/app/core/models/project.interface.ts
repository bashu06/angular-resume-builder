export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  isOngoing: boolean;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  achievements: string[];
  role: string;
}