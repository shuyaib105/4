'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminQuestionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Question Management</h1>
        <p className="text-muted-foreground">
          Upload questions for course exams.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upload New Question Set</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The question upload form will be available here soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
