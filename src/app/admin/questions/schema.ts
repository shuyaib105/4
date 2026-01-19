import { z } from 'zod';

const QuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).min(2, "Each question must have at least 2 options."),
  answer: z.string(),
});

function validateQuestionsJson(val: string) {
  try {
    const parsed = JSON.parse(val);
    const arrayCheck = z.array(QuestionSchema).min(1, "There must be at least one question.").safeParse(parsed);
    return arrayCheck.success;
  } catch (e) {
    return false;
  }
}

function validateDateTime(val: string) {
    return val && !isNaN(Date.parse(val));
}

export const ExamFormSchema = z.object({
  courseId: z.string().min(1, 'Please select a course.'),
  examName: z.string().min(3, 'Exam name must be at least 3 characters.'),
  startTime: z.string().refine(validateDateTime, { message: "A valid start time is required." }),
  endTime: z.string().refine(validateDateTime, { message: "A valid end time is required." }),
  duration: z.coerce.number().min(1, 'Duration must be at least 1 minute.'),
  negativeMark: z.coerce.number().min(0, 'Negative mark cannot be negative.'),
  questionsJson: z.string().refine(
    validateQuestionsJson,
    { message: 'Invalid JSON format, empty array, or incorrect question structure.' }
  ),
});

export type ExamFormValues = z.infer<typeof ExamFormSchema>;
