export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: string[];
  jobDescription: string;
  uploadedResumeText: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface AnalysisResult {
  atsScore: number;
  keywordMatchPercent: number;
  uniquenessScore: number;
  readabilityScore: number;
  rating: 'Beginner' | 'Intermediate' | 'Strong' | 'Expert';
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  improvements: string[];
  improvedBullets: { original: string; improved: string }[];
  skillConfidence: { skill: string; score: number; basis: string }[];
}

export interface ImprovedResume {
  summary: string;
  experience: { company: string; position: string; startDate: string; endDate: string; bullets: string[] }[];
  projects: { name: string; description: string; technologies: string[] }[];
  skills: { category: string; items: string[] }[];
  education: { degree: string; field: string; institution: string; year: string; gpa: string }[];
  certifications: string[];
  changes: string[];
  improvedScores: {
    atsScore: number;
    keywordMatchPercent: number;
    readabilityScore: number;
    uniquenessScore: number;
    rating: 'Beginner' | 'Intermediate' | 'Strong' | 'Expert';
  };
}
