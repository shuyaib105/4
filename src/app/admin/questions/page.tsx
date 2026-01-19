'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { allCourses } from '@/lib/courses';
import { useToast } from '@/hooks/use-toast';
import { uploadExamAction } from './actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ExamFormSchema, type ExamFormValues } from './schema';

export default function AdminQuestionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(ExamFormSchema),
    defaultValues: {
      courseId: '',
      examName: '',
      startTime: '',
      endTime: '',
      duration: 30,
      negativeMark: 0,
      questionsJson: '[\n  {\n    "question": "What is the capital of France?",\n    "options": ["Berlin", "Madrid", "Paris", "Rome"],\n    "answer": "Paris"\n  }\n]',
    },
  });

  async function onSubmit(data: ExamFormValues) {
    setIsLoading(true);
    try {
      const result = await uploadExamAction(data);
      if (result.success) {
        toast({
          title: 'Success!',
          description: 'The exam has been uploaded successfully.',
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: result.error,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Question Management</h1>
          <p className="text-muted-foreground">
            Upload questions for course exams.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upload New Question Set</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Select Course</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course to add an exam to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allCourses.map(course => (
                          <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
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
                    <FormLabel>2. Exam Details</FormLabel>
                    <FormControl>
                      <Input placeholder="Exam Name (e.g., Physics Chapter 1 Quiz)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time (Validity)</FormLabel>
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
                      <FormLabel>End Time (Validity)</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (Minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="negativeMark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Negative Mark per Question</FormLabel>
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
                    <FormLabel>3. Questions (JSON format)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder='[{"question":"...","options":["A","B","C","D"],"answer":"A"}, ...]' 
                        rows={12} 
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Provide a JSON array of question objects. Each object must have 'question', 'options' (array of strings), and 'answer' keys.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload Questions'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
