'use server';

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { initializeFirebaseServer } from '@/firebase/server-init';
import { ExamFormSchema, type ExamFormValues } from './schema';

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
