'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ExamListPlaceholder() {
    return <p className="font-tiro-bangla">কোনো পরীক্ষা পাওয়া যায়নি।</p>;
}

export default function ExamsPage() {

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
              <ExamListPlaceholder />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>গত পরীক্ষা</CardTitle>
            </CardHeader>
            <CardContent>
              <ExamListPlaceholder />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>আগামী পরীক্ষা</CardTitle>
            </CardHeader>
            <CardContent>
               <ExamListPlaceholder />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
