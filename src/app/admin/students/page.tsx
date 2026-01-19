'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users } from 'lucide-react';

export default function AdminStudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">
            View and search all registered students.
          </p>
        </div>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search students by name or email..."
                    className="max-w-sm"
                />
            </div>
          <div className="text-center py-10 border rounded-lg">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
            <p className="mt-1 text-sm text-gray-500">Student data will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
