'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function AdminResultsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Result Management</h1>
        <p className="text-muted-foreground">
          View and manage student results for all courses.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>View Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results available</h3>
            <p className="mt-1 text-sm text-gray-500">Results will appear here once students take exams.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
