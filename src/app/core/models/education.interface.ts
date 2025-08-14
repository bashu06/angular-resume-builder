export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  gpa?: number;
  honors?: string[];
  relevantCoursework?: string[];
  description?: string;
}