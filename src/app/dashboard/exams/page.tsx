'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
              <p className="font-tiro-bangla">আজ কোনো পরীক্ষা নেই।</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>গত পরীক্ষা</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-tiro-bangla">আপনি এখনো কোনো পরীক্ষায় অংশগ্রহণ করেননি।</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>আগামী পরীক্ষা</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-tiro-bangla">আপনার কোনো পরীক্ষা তালিকাভুক্ত নেই।</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
