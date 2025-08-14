export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Language' | 'Soft' | 'Tools' | 'Frameworks' | 'Other';
  yearsOfExperience?: number;
  keywords?: string[];
}