'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { allCourses } from '@/lib/courses';

export default function AdminQuestionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Question Management</h1>
          <p className="text-muted-foreground">
            Upload questions for course exams.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upload New Question Set</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="course-select">1. Select Course</Label>
              <Select>
                <SelectTrigger id="course-select">
                  <SelectValue placeholder="Select a course to add an exam to" />
                </SelectTrigger>
                <SelectContent>
                  {allCourses.map(course => (
                    <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="exam-name">2. Exam Details</Label>
                <Input id="exam-name" placeholder="Exam Name (e.g., Physics Chapter 1 Quiz)" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="exam-start-time">Start Time (Validity)</Label>
                    <Input id="exam-start-time" type="datetime-local" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="exam-end-time">End Time (Validity)</Label>
                    <Input id="exam-end-time" type="datetime-local" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="exam-duration">Duration (Minutes)</Label>
                    <Input id="exam-duration" type="number" placeholder="e.g., 30" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="negative-mark">Negative Mark per Question</Label>
                    <Input id="negative-mark" type="number" step="0.01" placeholder="e.g., 0.25" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="questions-json">3. Questions (JSON format)</Label>
                <Textarea 
                  id="questions-json" 
                  placeholder='[{"question":"...","options":["A","B","C","D"],"answer":"A"}, ...]' 
                  rows={12} 
                />
                 <p className="text-xs text-muted-foreground">
                  Provide a JSON array of question objects. Each object must have 'question', 'options' (array of strings), and 'answer' keys.
                </p>
            </div>

            <Button className="w-full" size="lg">Upload Questions</Button>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
