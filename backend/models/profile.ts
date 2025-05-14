export interface Education {
  school: string;
  institution: string;
  year: number;
  degree: string;
  graduationYear: string;
}

export interface Experience {
  company: string;
  title: string;
  duration: string; // e.g., "Jan 2020 – Dec 2022"
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  skills: string[];
  yearsOfExperience: number;
  aboutMe: string;
  education: Education[];
  experience: Experience[];
  pathToResume: string;
  extractedText: string;
  selectedJobPostIds: string[];
}
