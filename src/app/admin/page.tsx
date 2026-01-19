'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

// Replace this with a more secure way of identifying admins, e.g., Firestore custom claims
const ADMIN_UID = 'YOUR_ADMIN_UID_HERE'; // TODO: Replace with Shuyaib Islam's actual UID

export default function AdminPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.displayName !== 'Shuyaib Islam')) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.displayName !== 'Shuyaib Islam') {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading & Verifying Access...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-tiro-bangla">অ্যাডমিন প্যানেল</h1>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Shield className="h-8 w-8 text-primary" />
          <CardTitle>Welcome, Admin!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the central hub for managing courses, students, and results.</p>
        </CardContent>
      </Card>
    </div>
  );
}
