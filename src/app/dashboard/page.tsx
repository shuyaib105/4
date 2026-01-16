'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useFirebaseApp } from '@/firebase';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const app = useFirebaseApp();
  const auth = getAuth(app);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (isLoading) {
    return (
        <div className="p-8">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-6 w-full mb-8" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-40 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                </CardContent>
            </Card>
        </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">An error occurred: {error.message}</div>;
  }
  
  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>ড্যাশবোর্ড</CardTitle>
          <CardDescription>স্বাগতম, {user.displayName || user.email}!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখতে পারবেন।</p>
          <div>
            <p><strong>নাম:</strong> {user.displayName}</p>
            <p><strong>ইমেইল:</strong> {user.email}</p>
          </div>
          <Button onClick={handleLogout} variant="destructive">
            লগ আউট
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
