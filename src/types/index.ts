export interface Certification {
  id: string;
  name: string;
  code: string;
  vendor: string;
  domain: string;
  level: 'Foundational' | 'Fundamentals' | 'Entry' | 'Core' | 'Associate' | 'Professional' | 'Expert' | 'Specialty' | 'Foundation' | 'Advanced' | 'Specialist' | 'Intermediate';
  questionCount: number;
  timeMinutes: number;
  passingScore: number;
  description: string;
  topics: string[];
  popular?: boolean;
}

export interface Question {
  id: string;
  certId: string;
  domain: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  flagged?: boolean;
}

export interface ExamSession {
  id: string;
  certId: string;
  startTime: number;
  endTime?: number;
  answers: Record<number, number>;
  flagged: number[];
  status: 'in-progress' | 'completed' | 'abandoned';
}

export interface DomainScore {
  domain: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface ExamResult {
  sessionId: string;
  certId: string;
  certName: string;
  score: number;
  passed: boolean;
  domainScores: DomainScore[];
  timeTaken: number;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
}

export interface UserProgress {
  examHistory: ExamResult[];
  bookmarks: string[];
  streakDays: number;
  lastActive: string;
}

export type Domain =
  | 'Cloud — AWS'
  | 'Cloud — Azure'
  | 'Cloud — GCP'
  | 'General IT — CompTIA'
  | 'Networking — Cisco'
  | 'Cybersecurity'
  | 'Project Management & ITSM'
  | 'DevOps, Kubernetes & Linux'
  | 'Data, AI & Analytics'
  | 'Software Testing'
  | 'Agile & Scrum';

export type SortOption = 'name' | 'difficulty' | 'popularity';

export interface FilterState {
  domain: string;
  vendor: string;
  level: string;
  search: string;
  sort: SortOption;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type UserRole = 'admin' | 'jobSeeker' | 'jobPoster';

export interface RoleInfo {
  id: UserRole;
  label: string;
  description: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
}
