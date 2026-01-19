'use client';

import { useState, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileFormSchema = z.object({
  displayName: z.string().min(1, 'নাম আবশ্যক'),
  email: z.string().email(),
  photoURL: z.string().url('সঠিক URL প্রদান করুন').or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { user } = useUser();
  const app = useFirebaseApp();
  const firestore = useFirestore();
  const auth = getAuth(app);
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
      email: userData?.email || user?.email || '',
      photoURL: userData?.photoURL || user?.photoURL || '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    if (!user || !userDocRef) return;
    setIsLoading(true);

    try {
      // Update Firebase Auth profile
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
      }

      // Update Firestore document
      await updateDoc(userDocRef, {
        displayName: data.displayName,
        photoURL: data.photoURL,
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
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  if (isDataLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-tiro-bangla">প্রোফাইল</h1>
        <p className="text-muted-foreground font-tiro-bangla">আপনার ব্যক্তিগত তথ্য দেখুন এবং সম্পাদন করুন।</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>প্রোফাইল তথ্য</CardTitle>
          <CardDescription>
            আপনার নাম এবং প্রোফাইল ছবি পরিবর্তন করুন।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center gap-4">
                 <Avatar className="h-20 w-20">
                    <AvatarImage src={form.watch('photoURL') || userData?.photoURL || ''} />
                    <AvatarFallback>{getInitials(form.watch('displayName') || userData?.displayName)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="photoURL"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>প্রোফাইল ছবির URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.png" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
              </div>

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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ইমেইল</FormLabel>
                    <FormControl>
                      <Input readOnly disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
