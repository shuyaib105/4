'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { LogOut, BookOpen, User } from 'lucide-react';

import { useUser, useFirebaseApp, useFirestore, useDoc } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const profileFormSchema = z.object({
  displayName: z.string().min(1, 'নাম আবশ্যক'),
  collegeName: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user } = useUser();
  const app = useFirebaseApp();
  const firestore = useFirestore();
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const userDocRef = useMemo(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userData, isLoading: isDataLoading } = useDoc(userDocRef);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    values: {
      displayName: userData?.displayName || user?.displayName || '',
      collegeName: userData?.collegeName || '',
    },
    mode: 'onChange',
  });
  
  useEffect(() => {
      if(userData) {
          form.reset({
              displayName: userData.displayName || user?.displayName || '',
              collegeName: userData.collegeName || '',
          });
      }
  }, [userData, user, form]);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!user || !userDocRef) return;
    setIsLoading(true);

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: data.displayName,
        });
      }

      await updateDoc(userDocRef, {
        displayName: data.displayName,
        collegeName: data.collegeName,
      });

      toast({
        title: 'প্রোফাইল আপডেট হয়েছে',
        description: 'আপনার তথ্য সফলভাবে সেভ হয়েছে।',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: 'প্রোফাইল আপডেট করার সময় একটি সমস্যা হয়েছে।',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (isDataLoading) {
    return <div>Loading profile...</div>;
  }

  const enrolledCourses = userData?.enrolledCourses || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-tiro-bangla">প্রোফাইল</h1>
        <p className="text-muted-foreground font-tiro-bangla">আপনার ব্যক্তিগত তথ্য এবং কোর্স দেখুন।</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <CardTitle>প্রোফাইল তথ্য</CardTitle>
              <CardDescription>
                আপনার নাম এবং কলেজ পরিবর্তন করুন।
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>আপনার নাম</FormLabel>
                    <FormControl>
                      <Input placeholder="আপনার পুরো নাম" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="collegeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>কলেজের নাম</FormLabel>
                    <FormControl>
                      <Input placeholder="আপনার কলেজের নাম" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'সেভ হচ্ছে...' : 'পরিবর্তন সেভ করুন'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6"/> 
            <span>আপনার কোর্সসমূহ</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {enrolledCourses.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {enrolledCourses.map((course: string) => (
                <Badge key={course} variant="secondary" className="text-base font-tiro-bangla p-2">
                  {course}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="font-tiro-bangla text-muted-foreground">আপনি এখনো কোনো কোর্সে এনরোল করেননি।</p>
          )}
        </CardContent>
      </Card>
      
      <Separator />

      <Button variant="destructive" onClick={handleLogout} className="w-full md:w-auto">
        <LogOut className="mr-2 h-4 w-4" />
        লগআউট
      </Button>
    </div>
  );
}
