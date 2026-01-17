'use client';

import { useParams, useRouter } from 'next/navigation';
import { allCourses } from '@/lib/courses';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Calendar, UserCircle, Info, Shield } from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';
import { useUser } from '@/firebase';
import { cn } from '@/lib/utils';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const course = allCourses.find(c => c.id === courseId);

  // Header and menu state
  const { user } = useUser();


  const executeRedirect = () => {
    const encodedCourseName = encodeURIComponent(course?.title || '');
    if (user) {
        router.push(`/dashboard?course=${encodedCourseName}`);
    } else {
        router.push(`/login?course=${encodedCourseName}`);
    }
  };


  const heroData = {
    subtitle: 'সহজ ব্যাখ্যা আর আধুনিক টেকনিকের মাধ্যমে আমরা তোমার সিলেবাসের ভয় দূর করবো ইনশাআল্লাহ্‌।'
  };
  
  const footerData = {
    logo: "https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png",
    links: [
      { "url": "https://t.me/syllabuserbaire", icon: <FaTelegramPlane className="h-5 w-5 text-[#0088cc]"/>, "text": "টেলিগ্রাম চ্যানেল" },
      { "url": "/about", icon: <Info className="h-5 w-5 text-blue-500"/>, "text": "আমাদের সম্পর্কে" },
      { "url": "/privacy-policy", icon: <Shield className="h-5 w-5 text-green-500"/>, "text": "প্রাইভেসি পলিসি" }
    ],
    copyright: "&copy; 2025 SYLLABUSER BAIRE"
  };

  if (!course) {
    return <div className="flex justify-center items-center h-screen">Course not found</div>;
  }

  return (
    <div className="bg-[#FFFDF5] text-foreground antialiased">
      {/* Header */}
      <header className="bg-white/95 px-[6%] py-2.5 flex justify-between items-center sticky top-0 z-10 shadow-sm h-[70px]">
        <Link href="/">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={45} height={45} quality={100} className="h-[45px] w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <Link href={user ? '/dashboard' : '/login'} className="no-underline bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 uppercase hover:bg-yellow-500 hover:text-black transition-all">
              <UserCircle size={14}/>
              <span className="font-montserrat">{user ? 'Dashboard' : 'Account'}</span>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                    <Image src={course.image} alt={course.title} width={600} height={350} className="w-full h-auto object-cover rounded-lg shadow-lg" data-ai-hint={course.imageHint} />
                </div>
                <div className="flex flex-col h-full">
                    <h1 className="text-3xl lg:text-4xl font-black font-montserrat mb-3">{course.title}</h1>
                    <div className="flex items-center gap-4 mb-4">
                        <span className={cn("text-white px-4 py-1 rounded-full text-lg font-semibold whitespace-nowrap", course.price === 'EXPIRED' ? 'bg-destructive' : 'bg-green-500')}>
                            {course.price}
                        </span>
                        {course.startDate && (
                            <div className="flex items-center text-md text-gray-600">
                                <Calendar className="mr-2 text-accent" size={16} />
                                <span className="font-tiro-bangla">{course.startDate}</span>
                            </div>
                        )}
                    </div>
                    {course.description && <p className="text-lg leading-relaxed text-gray-700 font-tiro-bangla my-4">{course.description}</p>}
                    
                    <div className="my-4">
                        <h3 className="font-bold text-xl mb-3 font-tiro-bangla">কোর্সের ফিচারসমূহ</h3>
                        <div className="space-y-2">
                        {course.features.map(feature => (
                            <div key={feature} className="flex items-center">
                                <CheckCircle className="text-blue-500 mr-3" size={20} />
                                <span className="font-tiro-bangla text-gray-800">{feature}</span>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button
                            onClick={executeRedirect}
                            disabled={course.disabled}
                            className={cn("inline-block bg-primary text-black px-8 py-4 rounded-lg no-underline font-bold mt-4 w-full transition-all duration-300 font-montserrat text-lg", 
                            course.disabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-lg")}>
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center font-tiro-bangla mb-8">কোর্স রুটিন</h2>
                <div className="overflow-x-auto">
                  <p className="text-center text-gray-500">কোর্স রুটিন খুব শীঘ্রই এখানে আপডেট করা হবে।</p>
                  {/* Placeholder for course routine table */}
                </div>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-gray-300 pt-12 pb-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-block">
                <Image src={footerData.logo} alt="Footer Logo" width={60} height={60} quality={100} className="h-16 w-auto mb-2 mx-auto" />
            </div>
            <p className="mt-2 text-base text-gray-400 max-w-md mx-auto font-tiro-bangla">{heroData.subtitle}</p>
            
            <div className="flex justify-center gap-6 my-8">
                {footerData.links.map(link => (
                  <Link key={link.text} href={link.url} className="text-gray-300 hover:text-white font-medium transition-colors duration-300 text-sm flex items-center gap-2">
                    {link.icon}
                    <span className="font-tiro-bangla">{link.text}</span>
                  </Link>
                ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500 font-montserrat" dangerouslySetInnerHTML={{ __html: footerData.copyright }} />
            </div>
        </div>
      </footer>
    </div>
  );
}
