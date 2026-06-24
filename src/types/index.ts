export interface Certification {
  id: string;
  name: string;
  code: string;
  vendor: string;
  domain: string;
  level: 'Foundational' | 'Fundamentals' | 'Entry' | 'Core' | 'Associate' | 'Professional' | 'Expert' | 'Specialty' | 'Foundation';
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
  | 'Data, AI & Analytics';

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
