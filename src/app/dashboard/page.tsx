'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser, useFirebaseApp, useFirestore } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';


export default function DashboardPage() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = useFirestore();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Handle auto-enrollment from URL query parameter
  useEffect(() => {
    const enrollCourse = async () => {
      const courseToEnroll = searchParams.get('course');
      if (courseToEnroll && user) {
        const decodedCourseName = decodeURIComponent(courseToEnroll);
        const userDocRef = doc(firestore, 'users', user.uid);
        
        // Check if user is already enrolled
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        if (userData && userData.enrolledCourses && userData.enrolledCourses.includes(decodedCourseName)) {
          // Already enrolled, just remove the query param
           router.replace('/dashboard');
          return;
        }

        try {
          await updateDoc(userDocRef, {
            enrolledCourses: arrayUnion(decodedCourseName)
          });
          toast({
            title: "Success",
            description: `Enrolled in ${decodedCourseName} successfully!`,
          });
        } catch (e: any) {
            // If the document does not exist, create it
            if (e.code === 'not-found') {
                 await setDoc(userDocRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    createdAt: serverTimestamp(),
                    enrolledCourses: [decodedCourseName],
                });
                toast({
                    title: "Success",
                    description: `Enrolled in ${decodedCourseName} successfully!`,
                });
            } else {
                 console.error("Error enrolling course: ", e);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "There was a problem enrolling in the course.",
                });
            }
        } finally {
          // Remove the query parameter from the URL
          router.replace('/dashboard');
        }
      }
    };

    if (user) {
      enrollCourse();
    }
  }, [user, searchParams, firestore, router, toast]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">An error occurred: {error.message}</div>;
  }

  return (
    <div className="bg-[#FFFDF5] min-h-screen">
      <header className="bg-white/95 px-[6%] py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <Link href="/">
            <img src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" className="h-[45px] w-auto" />
          </Link>
          <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">Welcome, {user.displayName || user.email}</span>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
        <p className="mb-8">Here are the courses you are enrolled in.</p>
        
        {/* Placeholder for enrolled courses */}
        <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
            <p className="text-gray-500">You are not enrolled in any courses yet.</p>
            <Link href="/#courses-section">
                <Button className="mt-4">Browse Courses</Button>
            </Link>
        </div>
      </main>
    </div>
  );
}
