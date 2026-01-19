
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useFirebaseApp } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email('সঠিক ইমেইল প্রদান করুন'),
  password: z.string().min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const form = useForm<FormValues>({
    resolver: zodResolver(
      isLogin
        ? formSchema.omit({ name: true })
        : formSchema
    ),
    defaultValues: { name: '', email: '', password: '' }
  });

  const handleAuth: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const { email, password, name } = data;

    try {
      if (isLogin) {
        // Handle Login
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'সফলভাবে লগইন হয়েছে' });
      } else {
        // Handle Sign Up
        if (!name || name.trim() === '') {
          form.setError('name', { type: 'manual', message: 'নাম প্রদান করুন' });
          setIsLoading(false);
          return;
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update Firebase auth profile
        await updateProfile(user, { displayName: name });

        // Create user profile in Firestore
        await setDoc(doc(firestore, "users", user.uid), {
            uid: user.uid,
            displayName: name,
            email: user.email,
            photoURL: user.photoURL || null,
            createdAt: serverTimestamp(),
            enrolledCourses: [],
        });
        toast({ title: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে' });
      }
      
      const course = searchParams.get('course');
      const redirectUrl = course ? `/dashboard?course=${encodeURIComponent(course)}` : '/dashboard';
      router.push(redirectUrl);

    } catch (error: any) {
      console.error(error);
      const errorMessage = error.code === 'auth/email-already-in-use'
        ? 'এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে।'
        : error.code === 'auth/invalid-credential'
        ? 'ভুল ইমেইল অথবা পাসওয়ার্ড।'
        : 'একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।';
      
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          toast({
            variant: 'destructive',
            title: 'ত্রুটি',
            description: 'ভুল ইমেইল অথবা পাসওয়ার্ড।',
          });
      } else {
        toast({
          variant: 'destructive',
          title: 'ত্রুটি',
          description: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    form.reset(); // Reset form fields on toggle
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFFDF5] p-5">
      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-lg text-center relative">
        <div className="mb-6">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="সিলেবাসের বাইরে" width={100} height={100} className="mx-auto" />
        </div>

        <h2 className="font-extrabold text-2xl mb-2 text-black">
          {isLogin ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
        </h2>
        
        <p className="text-gray-500 mb-6">
            {isLogin ? 'নতুন?' : 'ইতিমধ্যে অ্যাকাউন্ট আছে?'}
            <button onClick={toggleForm} className="text-accent font-semibold ml-1 hover:underline">
                {isLogin ? 'অ্যাকাউন্ট তৈরি করুন' : 'লগইন করুন'}
            </button>
        </p>
        
        {!isLogin && (
            <div className="bg-yellow-50 border-l-4 border-accent p-3 mb-6 rounded-lg text-left flex items-start">
                <AlertTriangle className="h-5 w-5 text-accent mr-2 shrink-0" />
                <p className="text-sm text-yellow-800 leading-tight">
                    <strong>সতর্কবার্তা:</strong> আপনার প্রদত্ত নাম সার্টিফিকেট এবং অন্যান্য জায়গায় ব্যবহৃত হবে। প্রয়োজনে ড্যাশবোর্ড থেকে নাম পরিবর্তন করতে পারবেন।
                </p>
            </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAuth)} className="space-y-4">
            {!isLogin && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="block mb-2 font-semibold text-gray-600">আপনার নাম</FormLabel>
                    <FormControl>
                      <Input 
                        className="w-full p-3 border-2 border-gray-200 rounded-lg outline-none focus:border-accent" 
                        placeholder="আপনার পুরো নাম" 
                        {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="block mb-2 font-semibold text-gray-600">ইমেইল</FormLabel>
                  <FormControl>
                    <Input 
                      className="w-full p-3 border-2 border-gray-200 rounded-lg outline-none focus:border-accent" 
                      placeholder="example@email.com" 
                      {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="block mb-2 font-semibold text-gray-600">পাসওয়ার্ড</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      className="w-full p-3 border-2 border-gray-200 rounded-lg outline-none focus:border-accent" 
                      placeholder="••••••••" 
                      {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full p-4 h-auto bg-black text-white rounded-lg font-bold text-base uppercase transition hover:bg-accent disabled:bg-gray-400">
              {isLoading ? 'লোড হচ্ছে...' : (isLogin ? 'লগইন করুন' : 'সাইন আপ করুন')}
            </Button>
          </form>
        </Form>

        <Link href="/" className="mt-6 inline-flex items-center gap-2 text-gray-500 hover:text-accent">
          <ArrowLeft className="h-4 w-4" /> 
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
