'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function AdminPage() {
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
