export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string[];
  achievements: string[];
  technologies?: string[];
  website?: string;
}