export interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
  createdAt: Date;
  updatedAt: Date;
  matchedCandidates?: string[]; // Array of matched candidate IDs
}
