'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';

export default function AdminQuestionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Question Management</h1>
          <p className="text-muted-foreground">
            Upload and manage questions for each course.
          </p>
        </div>
        <Button>Upload Questions</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No questions uploaded yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by uploading a new question set.</p>
            <div className="mt-6">
              <Button>
                Upload Questions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
