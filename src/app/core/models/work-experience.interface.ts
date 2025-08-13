export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrentJob: boolean;
  description: string;
  achievements: string[];
  technologies?: string[];
}