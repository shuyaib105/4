'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useUser, useFirebaseApp, useFirestore, useDoc } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutGrid, User, LogOut, PlusCircle, Calendar, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allCourses } from '@/lib/courses';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const { user, isLoading: isUserLoading, error: userError } = useUser();
  const router = useRouter();
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = useFirestore();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile'>('dashboard');

  const userDocRef = useMemo(() => (user ? doc(firestore, 'users', user.uid) : null), [user, firestore]);
  const { data: userProfile, isLoading: isProfileLoading, error: profileError } = useDoc(userDocRef);

  const searchParams = useSearchParams();

  // Handle auto-enrollment from URL query parameter
  useEffect(() => {
    const courseToEnroll = searchParams.get('course');
    if (courseToEnroll && user && userProfile !== undefined) { // ensure userProfile is checked
      const decodedCourseName = decodeURIComponent(courseToEnroll);

      // Check if not already enrolled to prevent multiple toasts
      if (!userProfile?.enrolledCourses?.includes(decodedCourseName)) {
        const userDocRef = doc(firestore, 'users', user.uid);
        updateDoc(userDocRef, {
          enrolledCourses: arrayUnion(decodedCourseName)
        }).then(() => {
          toast({ title: `"${decodedCourseName}" সফলভাবে যোগ করা হয়েছে!` });
          router.replace('/dashboard', { scroll: false });
        }).catch(error => {
          console.error("Error enrolling course: ", error);
          toast({ variant: 'destructive', title: 'ত্রুটি', description: 'কোর্স যোগ করতে একটি সমস্যা হয়েছে।' });
        });
      } else {
        // If already enrolled, just remove the query param
        router.replace('/dashboard', { scroll: false });
      }
    }
  }, [searchParams, user, userProfile, firestore, router, toast]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };
  
  const isLoading = isUserLoading || isProfileLoading;

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 bg-[#FFFDF5] min-h-screen">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-6 w-64 mb-6" />
        <Skeleton className="h-14 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (userError || profileError) {
    return <div className="text-center p-8 text-red-500">An error occurred: {userError?.message || profileError?.message}</div>;
  }

  if (!user) {
    return null; // or a loading component, though the useEffect should redirect
  }
  
  const enrolledCoursesData = allCourses.filter(course => userProfile?.enrolledCourses?.includes(course.title));

  return (
    <div className="bg-[#FFFDF5] min-h-screen">
      
      {/* Header */}
      <header className="bg-white px-5 py-2.5 flex justify-between items-center sticky top-0 z-10 shadow-sm h-[70px]">
          <Link href="/">
            <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={45} height={45} quality={100} />
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="no-underline bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 uppercase">
                <Home size={14}/>
                <span>Home</span>
            </Link>
          </div>
      </header>

      <main className="p-5 pb-24">
        <div className="welcome-header mb-6">
            <h2 className="text-3xl font-bold text-black">আসসালামু আলাইকুম!</h2>
            <p className="text-lg text-gray-600">আপনার প্রস্তুতির জন্য শুভকামনা</p>
            <div className="mt-2 inline-block font-sans text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md border border-yellow-200 font-semibold">
                {user.displayName || user.email}
            </div>
        </div>
      
        {activeTab === 'dashboard' && (
            <div className="animate-in fade-in-50">
              <Link href="/#courses-section">
                <Button className="w-full h-14 mb-6 bg-black text-white text-lg rounded-xl hover:bg-gray-800 font-tiro-bangla">
                    <PlusCircle className="mr-2"/>
                    কোর্স যোগ বা পরিবর্তন করুন
                </Button>
              </Link>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {enrolledCoursesData.length > 0 ? (
                        enrolledCoursesData.map(course => (
                            <Card key={course.id} className="rounded-2xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <CardContent className="p-0">
                                    <Image src={course.image} alt={course.title} width={400} height={200} className="w-full h-40 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold font-montserrat">{course.title}</h3>
                                        <Button className="w-full mt-4 bg-primary text-black rounded-lg hover:bg-yellow-500 font-tiro-bangla">
                                            <Calendar className="mr-2" size={16} />
                                            রুটিন দেখুন
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="md:col-span-2 text-center py-10 px-4 bg-white rounded-2xl shadow-sm">
                            <p className="text-gray-500 font-tiro-bangla">আপনার ড্যাশবোর্ড খালি।</p>
                            <p className="text-gray-500 mb-4 font-tiro-bangla">একটি কোর্স যোগ করে আপনার পড়াশোনা শুরু করুন।</p>
                            <Link href="/#courses-section">
                                <Button className="font-tiro-bangla">কোর্স দেখুন</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        )}

        {activeTab === 'profile' && (
          <div className="animate-in fade-in-50">
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-yellow-400">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'}/>
                        <AvatarFallback className="text-3xl bg-gray-200">
                            {user.displayName ? user.displayName[0].toUpperCase() : user.email![0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold font-montserrat">{user.displayName}</h2>
                    <p className="text-gray-500 font-montserrat">{user.email}</p>

                    <div className="flex gap-4 mt-6">
                        <div className="text-center p-4 bg-gray-100 rounded-xl min-w-[80px]">
                            <p className="text-2xl font-bold text-yellow-600 font-montserrat">{enrolledCoursesData.length}</p>
                            <p className="text-sm text-gray-600 font-tiro-bangla">কোর্স</p>
                        </div>
                        <div className="text-center p-4 bg-gray-100 rounded-xl min-w-[80px]">
                           <p className="text-2xl font-bold text-yellow-600 font-montserrat">0%</p>
                           <p className="text-sm text-gray-600 font-tiro-bangla">অগ্রগতি</p>
                        </div>
                    </div>

                    <Button onClick={handleLogout} variant="destructive" className="mt-8 w-full max-w-xs font-tiro-bangla">
                        <LogOut className="mr-2"/>
                        লগ আউট
                    </Button>
                  </div>
              </CardContent>
            </Card>
          </div>
        )}

      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.05)] flex z-10">
          <button onClick={() => setActiveTab('dashboard')} className={cn("flex-1 flex flex-col items-center justify-center gap-1 transition-colors", activeTab === 'dashboard' ? 'text-yellow-600' : 'text-gray-400')}>
              <LayoutGrid />
              <span className="text-xs font-semibold font-tiro-bangla">ড্যাশবোর্ড</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={cn("flex-1 flex flex-col items-center justify-center gap-1 transition-colors", activeTab === 'profile' ? 'text-yellow-600' : 'text-gray-400')}>
              <User />
              <span className="text-xs font-semibold font-tiro-bangla">প্রোফাইল</span>
          </button>
      </nav>

    </div>
  );
}
