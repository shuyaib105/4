import type { Timestamp } from 'firebase/firestore';

export interface ExamQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface Exam {
  id: string;
  courseId: string;
  examName: string;
  startTime: Timestamp;
  endTime: Timestamp;
  duration: number; // in minutes
  negativeMark: number;
  questions: ExamQuestion[];
  createdAt: Timestamp;
}
