'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFirestore, addDoc, collection, Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';

import { useFirebaseApp, useUser } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { allCourses } from '@/lib/courses';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ExamFormSchema, type ExamFormValues } from './schema';

const ADMIN_EMAIL = 'mdshuyaibislam5050@gmail.com';

const physicsQuestions = [
    {
        "question": "কুলম্ব ধ্রুবকের একক কোনটি?",
        "options": ["C² N⁻¹ m⁻²", "C² N m⁻²", "N m² C⁻²", "N m² C²"],
        "answer": "N m² C⁻²"
    },
    {
        "question": "নিচের কোন পদার্থের পরাবৈদ্যুতিক ধ্রুবকের মান সর্বোচ্চ?",
        "options": ["বায়ু", "কাগজ", "সিলিকন", "পানি"],
        "answer": "পানি"
    },
    {
        "question": "আধান ও বিভবের গুণফলের একক কোনটি?",
        "options": ["ভোল্ট", "ফ্যারাড", "জুল", "হেনরি"],
        "answer": "জুল"
    },
    {
        "question": "শূন্য মাধ্যমে তড়িৎ ভেদনযোগ্যতার একক কোনটি?",
        "options": ["C² N⁻¹ m⁻²", "N A⁻²", "N m² C⁻²", "A m⁻²"],
        "answer": "C² N⁻¹ m⁻²"
    },
    {
        "question": "তড়িৎ দ্বিমেরু ভ্রামকের মাত্রা কোনটি?",
        "options": ["L T⁻¹", "LTI", "L² T¹", "LTI²"],
        "answer": "LTI"
    },
    {
        "question": "কোন গোলাকার পরিবাহীর আধান ও ক্ষেত্রফল চারগুণ করা হলে চার্জের তলমাত্রিক ঘনত্ব হবে-",
        "options": ["ষোলোগুণ", "চারগুণ", "অসীম", "অপরিবর্তিত থাকবে"],
        "answer": "অপরিবর্তিত থাকবে"
    },
    {
        "question": "তড়িৎ দ্বিমেরু ভ্রামকের একক নিচের কোনটি?",
        "options": ["কুলম্ব/মিটার", "কুলম্ব-মিটার", "মিটার/কুলম্ব", "কুলম্ব/মিটার²"],
        "answer": "কুলম্ব-মিটার"
    },
    {
        "question": "তড়িৎ প্রাবল্য ও তড়িৎ বিভবের মধ্যে সম্পর্ক নিম্নের কোনটি?",
        "options": ["E = V/r", "V = E/r", "E = r/V", "E = V/r²"],
        "answer": "E = V/r"
    },
    {
        "question": "তড়িৎ বিভবের ঋণাত্মক গ্রেডিয়েন্টকে কী বলে?",
        "options": ["চার্জ ঘনত্ব", "তড়িৎ ফ্লাক্স", "তড়িৎ প্রাবল্য", "ধারকত্ব"],
        "answer": "তড়িৎ প্রাবল্য"
    },
    {
        "question": "গাউসের সূত্রানুসারে কোনটি সঠিক?",
        "options": ["μ₀Φ = q", "μ₀q = Φ", "ε₀q = Φ", "q = Φε₀"],
        "answer": "q = Φε₀"
    },
    {
        "question": "তড়িৎ ফ্লাক্সের একক-",
        "options": ["N m⁻² C", "N m² C", "N⁻¹ m² C", "N m² C⁻¹"],
        "answer": "N m² C⁻¹"
    },
    {
        "question": "প্রোটনের আধান কত?",
        "options": ["1.6 × 10¹⁹ C", "1.67 × 10⁻²⁷ C", "1.6 × 10⁻¹⁹ C", "1.67 × 10⁻²৩ C"],
        "answer": "1.6 × 10⁻¹⁹ C"
    },
    {
        "question": "তড়িৎ ভেদনযোগ্যতার একক কোনটি?",
        "options": ["C² N⁻¹ m⁻²", "N m² C²", "C² N⁻² m⁻²", "N m⁻² C⁻²"],
        "answer": "C² N⁻¹ m⁻²"
    },
    {
        "question": "নিচের কোনটি ভোল্টের সমতুল্য?",
        "options": ["J A⁻¹ s⁻¹", "J A⁻¹ s", "J A S", "J A S⁻¹"],
        "answer": "J A⁻¹ s⁻¹"
    },
    {
        "question": "সমবিভব তলের যে কোনো দুটি বিন্দুর বিভব পার্থক্য-",
        "options": ["শূন্য", "অসীম", "এক ভোল্ট", "দুই ভোল্ট"],
        "answer": "শূন্য"
    },
    {
        "question": "ধারকে সঞ্চিত শক্তির ক্ষেত্রে নিচের কোনটি সঠিক?",
        "options": ["W = ½ QC", "W = ½ V C²", "W = ½ C V²", "W = ½ CV"],
        "answer": "W = ½ C V²"
    },
    {
        "question": "একটি চার্জিত ধারকের শক্তি ঘনত্ব নির্ণয় করা যাবে নিচের কোন সমীকরণের সাহায্যে?",
        "options": ["U = ½ QV", "U = ½ ε₀ E²", "U = ½ Q² C", "U = ½ ε₀ V²"],
        "answer": "U = ½ ε₀ E²"
    },
    {
        "question": "ধারকের পাতদ্বয়ের মধ্যবর্তী দূরত্ব বৃদ্ধি করলে ধারকত্ব-",
        "options": ["বৃদ্ধি পাবে", "হ্রাস পাবে", "অপরিবর্তিত থাকবে", "উভয়ই হতে পারে"],
        "answer": "হ্রাস পাবে"
    },
    {
        "question": "কুলম্বের সূত্রের ভেক্টর রূপ কোনটি?",
        "options": ["F = 1/(4πε₀) (q₁q₂/r²) r", "F = 1/(4πε₀) (q₁q₂/r³) r̂", "F = 1/(4πε₀) (q₁q₂/r³) r⃗", "F = 1/(4πε₀) (q₁q₂/r) r⃗"],
        "answer": "F = 1/(4πε₀) (q₁q₂/r³) r⃗"
    },
    {
        "question": "একটি চার্জিত বস্তুকে পৃথিবীর সাথে যুক্ত করলে চার্জের পরিমাণ-",
        "options": ["বৃদ্ধি পাবে", "হ্রাস পাবে", "অপরিবর্তিত থাকবে", "শূন্য হবে"],
        "answer": "শূন্য হবে"
    },
    {
        "question": "সবচেয়ে বেশি চার্জ থাকে চার্জিত বস্তুর কোথায়?",
        "options": ["কেন্দ্রে", "অবতল তলে", "সমতল তলে", "উত্তল তলে"],
        "answer": "উত্তল তলে"
    },
    {
        "question": "একটি দ্বিপোলের জন্য তড়িৎ প্রাবল্য কীরূপে পরিবর্তিত হয়?",
        "options": ["r⁻¹", "r⁻²", "r⁻³", "r⁻⁴"],
        "answer": "r⁻³"
    },
    {
        "question": "আধান ঘনত্বের একক কী?",
        "options": ["Cm⁻³", "Cm⁻²", "Cm²", "Cm³"],
        "answer": "Cm⁻²"
    },
    {
        "question": "বিভব পার্থক্য স্থির থাকলে একটি চার্জিত ধারকের শক্তি তার চার্জের-",
        "options": ["ব্যস্তানুপাতিক", "সমানুপাতিক", "বর্গের ব্যস্তানুপাতিক", "বর্গমূলের সমানুপাতিক"],
        "answer": "সমানুপাতিক"
    },
    {
        "question": "তড়িৎ ক্ষেত্রের মান নির্ণয় করা যায়-",
        "options": ["কুলম্বের সূত্র থেকে", "অ্যাম্পিয়ারের সূত্র থেকে", "গাউসের সূত্র থেকে", "i ও iii উভয়ই"],
        "answer": "i ও iii উভয়ই"
    }
];

export default function AdminQuestionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const app = useFirebaseApp();
  const firestore = getFirestore(app);

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(ExamFormSchema),
    defaultValues: {
      courseId: 'physics-second-part',
      examName: 'পদার্থবিজ্ঞান দ্বিতীয় পত্রঃ স্থির তড়িৎ পরীক্ষা',
      startTime: '',
      endTime: '',
      duration: 25,
      negativeMark: 0.25,
      questionsJson: JSON.stringify(physicsQuestions, null, 2),
    },
  });

  // Set start and end time dynamically for today
  useEffect(() => {
    const today = new Date();
    const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 20, 0);
    const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30, 0);

    form.setValue('startTime', format(startTime, "yyyy-MM-dd'T'HH:mm"));
    form.setValue('endTime', format(endTime, "yyyy-MM-dd'T'HH:mm"));
  }, [form]);


  async function onSubmit(data: ExamFormValues) {
    // 1. Check if the user is the admin. This is a client-side check for better UX.
    // The true security is handled by Firestore Security Rules.
    if (!user || user.email !== ADMIN_EMAIL) {
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description: 'You do not have the required permissions to upload an exam.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { courseId, examName, startTime, endTime, duration, negativeMark, questionsJson } = data;
      
      // The Zod schema already validates the JSON structure, but we still need to parse it.
      const questions = JSON.parse(questionsJson);

      // The `firestore` instance here is from the client, so it's authenticated.
      // Firestore will now check the security rules using this user's authentication.
      await addDoc(collection(firestore, 'exams'), {
        courseId,
        examName,
        startTime: Timestamp.fromDate(new Date(startTime)),
        endTime: Timestamp.fromDate(new Date(endTime)),
        duration: Number(duration),
        negativeMark: Number(negativeMark),
        questions,
        createdAt: Timestamp.now(),
      });

      toast({
        title: 'Success!',
        description: 'The exam has been uploaded successfully.',
      });
      form.reset({
        courseId: '',
        examName: '',
        startTime: '',
        endTime: '',
        duration: 30,
        negativeMark: 0,
        questionsJson: '[\n  {\n    "question": "What is the capital of France?",\n    "options": ["Berlin", "Madrid", "Paris", "Rome"],\n    "answer": "Paris"\n  }\n]',
      });
    } catch (error: any) {
      console.error('Error uploading exam:', error);
      let description = 'An unknown error occurred. Please check the console for details.';
      // Provide a more specific error message for permission denied.
      if (error.code === 'permission-denied') {
          description = 'Permission denied by security rules. Please ensure you are logged in with the admin email (mdshuyaibislam5050@gmail.com).';
      } else if (error instanceof SyntaxError) {
          description = 'The provided JSON for questions is invalid. Please check the format.';
      }
      
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: description,
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
