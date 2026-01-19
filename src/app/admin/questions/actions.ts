'use server';

import { z } from 'zod';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { initializeFirebaseServer } from '@/firebase/server-init';

const QuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).min(2, "Each question must have at least 2 options."),
  answer: z.string(),
});

// Extracted validation function to avoid Next.js compiler issues with inline functions in server actions.
function validateQuestionsJson(val: string) {
  try {
    const parsed = JSON.parse(val);
    const arrayCheck = z.array(QuestionSchema).min(1, "There must be at least one question.").safeParse(parsed);
    return arrayCheck.success;
  } catch (e) {
    return false;
  }
}

export const ExamFormSchema = z.object({
  courseId: z.string().min(1, 'Please select a course.'),
  examName: z.string().min(3, 'Exam name must be at least 3 characters.'),
  startTime: z.string().refine((val) => val && !isNaN(Date.parse(val)), { message: "A valid start time is required." }),
  endTime: z.string().refine((val) => val && !isNaN(Date.parse(val)), { message: "A valid end time is required." }),
  duration: z.coerce.number().min(1, 'Duration must be at least 1 minute.'),
  negativeMark: z.coerce.number().min(0, 'Negative mark cannot be negative.'),
  questionsJson: z.string().refine(
    validateQuestionsJson,
    { message: 'Invalid JSON format, empty array, or incorrect question structure.' }
  ),
});

export type ExamFormValues = z.infer<typeof ExamFormSchema>;

const { firestore } = initializeFirebaseServer();

export async function uploadExamAction(data: ExamFormValues) {
  const validation = ExamFormSchema.safeParse(data);
  if (!validation.success) {
    // Flatten the errors to be more readable
    const errorMessages = validation.error.flatten().fieldErrors;
    const firstError = Object.values(errorMessages)[0]?.[0] || 'Invalid form data.';
    return { success: false, error: firstError };
  }

  const { courseId, examName, startTime, endTime, duration, negativeMark, questionsJson } = validation.data;

  try {
    const questions = JSON.parse(questionsJson);

    await addDoc(collection(firestore, 'exams'), {
      courseId,
      examName,
      startTime: Timestamp.fromDate(new Date(startTime)),
      endTime: Timestamp.fromDate(new Date(endTime)),
      duration,
      negativeMark,
      questions,
      createdAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error uploading exam:', error);
    if (error.code === 'permission-denied') {
        return { success: false, error: 'Permission denied. You must be an admin to upload exams.' };
    }
    return { success: false, error: 'An unknown error occurred while uploading the exam.' };
  }
}
