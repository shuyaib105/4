'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useUser, useFirebaseApp, useFirestore, useDoc } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { allCourses } from '@/lib/courses';
import { BookOpen } from 'lucide-react';


export default function DashboardPage() {
  const { user, isLoading: isUserLoading, error: userError } = useUser();
  const router = useRouter();
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = useFirestore();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const userDocRef = useMemo(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  
  const { data: userData, isLoading: isDataLoading, error: dataError } = useDoc(userDocRef);

  // Handle auto-enrollment from URL query parameter
  useEffect(() => {
    const enrollCourse = async () => {
      const courseToEnroll = searchParams.get('course');
      if (courseToEnroll && user) {
        const decodedCourseName = decodeURIComponent(courseToEnroll);
        const userDocRef = doc(firestore, 'users', user.uid);
        
        // Check if user is already enrolled
        const userDoc = await getDoc(userDocRef);
        const currentData = userDoc.data();

        if (currentData && currentData.enrolledCourses && currentData.enrolledCourses.includes(decodedCourseName)) {
          // Already enrolled, just remove the query param
           router.replace('/dashboard');
          return;
        }

        try {
          if (userDoc.exists()) {
            await updateDoc(userDocRef, {
              enrolledCourses: arrayUnion(decodedCourseName)
            });
          } else {
            await setDoc(userDocRef, {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                createdAt: serverTimestamp(),
                enrolledCourses: [decodedCourseName],
            });
          }
          toast({
            title: "Success",
            description: `Enrolled in ${decodedCourseName} successfully!`,
          });
        } catch (e: any) {
            console.error("Error enrolling course: ", e);
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was a problem enrolling in the course.",
            });
        } finally {
          // Remove the query parameter from the URL
          router.replace('/dashboard');
        }
      }
    };

    if (user && !isUserLoading) {
      enrollCourse();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isUserLoading, searchParams, firestore, router, toast]);

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

  const isLoading = isUserLoading || isDataLoading;

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  const error = userError || dataError;
  if (error) {
    return <div className="text-center p-8 text-red-500">An error occurred: {error.message}</div>;
  }

  const enrolledCourseNames = userData?.enrolledCourses || [];
  const enrolledCourses = allCourses.filter(course => enrolledCourseNames.includes(course.title));

  return (
    <div className="bg-[#FFFDF5] min-h-screen">
      <header className="bg-white/95 px-[6%] py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <Link href="/">
            <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={56} height={56} quality={100} className="h-14 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">Welcome, {userData?.displayName || user.displayName || user.email}</span>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 font-tiro-bangla">আমার কোর্সসমূহ</h1>
        
        {enrolledCourses.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden shadow-lg transition-all hover:shadow-xl bg-white rounded-2xl flex flex-col md:flex-row">
                <div className="md:w-1/3 flex-shrink-0">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={250}
                    height={250}
                    className="object-cover w-full h-full"
                    data-ai-hint={course.imageHint}
                  />
                </div>
                <div className="p-6 flex flex-col justify-between md:w-2/3">
                  <div>
                    <h3 className="text-xl font-bold font-tiro-bangla mb-4">{course.title}</h3>
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-md font-tiro-bangla mb-2 text-accent">কোর্স রুটিন</h4>
                      <p className="text-gray-600 text-sm font-tiro-bangla">রুটিন খুব শীঘ্রই এখানে আপডেট করা হবে।</p>
                    </div>
                  </div>
                  <Link href={`/courses/${course.id}`} className="mt-6 self-start md:self-end">
                    <Button className="w-full md:w-auto bg-black text-white hover:bg-gray-800 font-montserrat">View Details</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
            <Card className="bg-white rounded-xl shadow-md text-center py-10">
                <CardHeader className="flex flex-col items-center">
                    <div className="bg-yellow-100 p-4 rounded-full mb-4">
                        <BookOpen className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="font-tiro-bangla text-2xl">এখনো কোনো কোর্স এনরোল করেননি</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500 font-tiro-bangla mb-6">আপনার পছন্দের কোর্সটি বেছে নিন এবং শেখা শুরু করুন।</p>
                    <Link href="/#courses-section">
                        <Button className="bg-primary text-black hover:bg-yellow-500 font-montserrat">সকল কোর্স দেখুন</Button>
                    </Link>
                </CardContent>
            </Card>
        )}
      </main>
    </div>
  );
}

    