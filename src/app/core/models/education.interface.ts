export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrentlyEnrolled: boolean;
  gpa?: string;
  honors?: string;
  relevantCourses?: string[];
}