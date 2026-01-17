'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser, useFirebaseApp, useFirestore, useDoc } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  const enrolledCourses = userData?.enrolledCourses || [];

  return (
    <div className="bg-[#FFFDF5] min-h-screen">
      <header className="bg-white/95 px-[6%] py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <Link href="/">
            <img src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" className="h-[45px] w-auto" />
          </Link>
          <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">Welcome, {userData?.displayName || user.displayName || user.email}</span>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
        
        <Card className="bg-white rounded-xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-4">
                    {enrolledCourses.map((courseName: string) => (
                      <div key={courseName} className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-center gap-4">
                        <BookOpen className="h-6 w-6 text-accent" />
                        <span className="font-semibold text-gray-800">{courseName}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-500">You are not enrolled in any courses yet.</p>
                    <Link href="/#courses-section">
                        <Button className="mt-4 bg-primary text-black hover:bg-yellow-500">Browse Courses</Button>
                    </Link>
                  </div>
                )}
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
