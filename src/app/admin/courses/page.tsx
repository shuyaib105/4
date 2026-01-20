'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { allCourses } from '@/lib/courses';
import Image from 'next/image';

export default function AdminCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Course Management</h1>
          <p className="text-muted-foreground">
            View and edit all available courses.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allCourses.map((course) => (
            <Card key={course.id}>
                <CardHeader>
                    <Image src={course.image} alt={course.title} width={400} height={200} className="w-full h-32 object-cover rounded-t-lg" data-ai-hint={course.imageHint} />
                    <CardTitle className="pt-4">{course.title}</CardTitle>
                    <CardDescription>{course.price}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                </CardContent>
                <CardFooter>
                    <Button disabled className="w-full">Edit Course (Coming Soon)</Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
