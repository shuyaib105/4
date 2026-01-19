'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function ResultsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold font-tiro-bangla">ফলাফল</h1>
        <p className="text-muted-foreground font-tiro-bangla">আপনার কোর্স-ভিত্তিক পরীক্ষার ফলাফল দেখুন।</p>
      </div>
      <Card className="text-center py-10">
          <CardHeader className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="font-tiro-bangla text-2xl">এখনো কোনো ফলাফল নেই</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-gray-500 font-tiro-bangla">পরীক্ষায় অংশগ্রহণ করার পর আপনার ফলাফল এখানে দেখা যাবে।</p>
          </CardContent>
      </Card>
    </div>
  );
}
