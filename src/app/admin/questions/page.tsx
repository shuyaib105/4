'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { allCourses } from '@/lib/courses';
import { ExamFormSchema, ExamFormValues } from './schema';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const jsonFormatPlaceholder = `[
  {
    "question": "Your question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  }
]`;

export default function AdminQuestionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(ExamFormSchema),
    defaultValues: {
      courseName: '',
      examName: '',
      startTime: '',
      endTime: '',
      duration: 60,
      negativeMark: 0,
      questionsJson: '',
    },
  });

  const onSubmit: SubmitHandler<ExamFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const questions = JSON.parse(data.questionsJson);

      const examData = {
        ...data,
        questions,
        createdAt: serverTimestamp(),
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      };
      
      // Remove questionsJson as it's not needed in the final document
      delete (examData as any).questionsJson;

      const examsCollection = collection(firestore, 'exams');
      await addDoc(examsCollection, examData);
      
      toast({
        title: 'Success!',
        description: 'The exam has been uploaded successfully.',
      });
      form.reset();
    } catch (error: any) {
      console.error('Error uploading exam:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error.message || 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Question Management</h1>
        <p className="text-muted-foreground">Upload questions for course exams.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upload New Exam</CardTitle>
          <CardDescription>
            Fill in the details below to create a new exam for a course.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="courseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allCourses.map((course) => (
                          <SelectItem key={course.id} value={course.title} disabled={course.disabled}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="examName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Physics Chapter 1 Quiz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                        <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                        <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (in minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 60" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="negativeMark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Negative Marking (per wrong answer)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g., 0.25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="questionsJson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Questions (JSON Format)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={jsonFormatPlaceholder}
                        className="min-h-[250px] font-mono text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Uploading...' : 'Upload Exam'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
