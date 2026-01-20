'use client';

import { useParams } from 'next/navigation';
import { useFirestore, useDoc } from '@/firebase';
import { doc, DocumentData } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock } from 'lucide-react';

interface ExamData extends DocumentData {
    examName: string;
    duration: number;
    questions: any[];
}

export default function ExamTakingPage() {
    const params = useParams();
    const examId = params.examId as string;
    const firestore = useFirestore();

    const examDocRef = doc(firestore, 'exams', examId);
    const { data: examData, isLoading } = useDoc<ExamData>(examDocRef);

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
        );
    }

    if (!examData) {
        return <div>Exam not found or you do not have permission to view it.</div>;
    }

    return (
        <div>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="font-tiro-bangla">{examData.examName}</CardTitle>
                    <div className="flex items-center text-muted-foreground gap-2">
                        <Clock className="h-4 w-4" />
                        <span>সময়: {examData.duration} মিনিট</span>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-tiro-bangla">প্রশ্নপত্র</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-10 font-tiro-bangla">
                        পরীক্ষার প্রশ্ন ও উত্তর দেওয়ার সম্পূর্ণ কার্যকারিতা খুব শীঘ্রই যুক্ত করা হবে।
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
