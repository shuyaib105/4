'use client';

import { useMemo } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useCollection, useDoc, useFirestore, useUser } from '@/firebase';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allCourses } from '@/lib/courses';
import type { Exam } from '@/lib/exams';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

function ExamCard({ exam }: { exam: Exam }) {
  const course = allCourses.find(c => c.id === exam.courseId);
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className='font-tiro-bangla text-xl'>{exam.examName}</CardTitle>
        <p className="text-sm text-muted-foreground font-semibold">{course?.title}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
            <div>
                <p className='font-tiro-bangla'><span className='font-semibold'>সময়:</span> {exam.duration} মিনিট</p>
                <p className='font-tiro-bangla'><span className='font-semibold'>নেগেটিভ মার্ক:</span> {exam.negativeMark}</p>
            </div>
            <Button>শুরু করুন</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ExamList({ exams, isLoading }: { exams: Exam[] | undefined | null, isLoading: boolean }) {
  if (isLoading) {
    return (
      <>
        <Skeleton className="h-36 w-full mb-4" />
        <Skeleton className="h-36 w-full" />
      </>
    )
  }

  if (!exams || exams.length === 0) {
    return <p className="font-tiro-bangla">কোনো পরীক্ষা পাওয়া যায়নি।</p>;
  }

  return (
    <div>
      {exams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
    </div>
  );
}

export default function ExamsPage() {
  const { user, isLoading: isUserLoading } = useUser();
  const firestore = useFirestore();
  
  const userDocRef = useMemo(() => user ? query(collection(firestore, 'users'), where('uid', '==', user.uid)) : null, [user, firestore]);
  const { data: userDataArr, isLoading: isUserDataLoading } = useCollection(userDocRef);
  const userData = useMemo(() => (userDataArr && userDataArr.length > 0 ? userDataArr[0] : null), [userDataArr]);
  
  const enrolledCourseTitles = useMemo(() => userData?.enrolledCourses || [], [userData]);
  const enrolledCourseIds = useMemo(() => allCourses.filter(c => enrolledCourseTitles.includes(c.title)).map(c => c.id), [enrolledCourseTitles]);

  const examsQuery = useMemo(() => 
    !isUserDataLoading && enrolledCourseIds.length > 0
      ? query(collection(firestore, 'exams'), where('courseId', 'in', enrolledCourseIds))
      : null
  , [firestore, enrolledCourseIds, isUserDataLoading]);
  
  const { data: exams, isLoading: isExamsLoading } = useCollection<Exam>(examsQuery);
  
  const now = useMemo(() => new Date(), []);

  const { todaysExams, pastExams, upcomingExams } = useMemo(() => {
    if (!exams) return { todaysExams: [], pastExams: [], upcomingExams: [] };
    
    const todays: Exam[] = [];
    const past: Exam[] = [];
    const upcoming: Exam[] = [];

    exams.forEach(exam => {
      const startTime = exam.startTime.toDate();
      const endTime = exam.endTime.toDate();

      if (endTime < now) {
        past.push(exam);
      } else if (startTime > now) {
        upcoming.push(exam);
      } else {
        todays.push(exam);
      }
    });

    return { todaysExams: todays, pastExams: past, upcomingExams: upcoming };
  }, [exams, now]);
  
  const isLoading = isUserLoading || isUserDataLoading || (enrolledCourseIds.length > 0 && isExamsLoading);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-tiro-bangla">পরীক্ষাসমূহ</h1>
        <p className="text-muted-foreground font-tiro-bangla">আপনার চলমান, অতীত এবং আসন্ন পরীক্ষাসমূহ দেখুন।</p>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">আজকের পরীক্ষা</TabsTrigger>
          <TabsTrigger value="past">গত পরীক্ষা</TabsTrigger>
          <TabsTrigger value="upcoming">আগামী পরীক্ষা</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>আজকের পরীক্ষা</CardTitle>
            </CardHeader>
            <CardContent>
              <ExamList exams={todaysExams} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>গত পরীক্ষা</CardTitle>
            </CardHeader>
            <CardContent>
              <ExamList exams={pastExams} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>আগামী পরীক্ষা</CardTitle>
            </CardHeader>
            <CardContent>
               <ExamList exams={upcomingExams} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
