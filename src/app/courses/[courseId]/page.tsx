'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { allCourses } from '@/lib/courses';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Calendar, UserRound, Info, Shield, Send, Menu } from 'lucide-react';
import { useUser } from '@/firebase';
import { cn } from '@/lib/utils';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const course = allCourses.find(c => c.id === courseId);

  // Header and menu state
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUser();

  const navLinks = [
    { href: '/', text: 'হোম' },
    { href: '/#courses-section', text: 'কোর্সসমূহ' },
    { href: '/about', text: 'আমাদের সম্পর্কে' },
  ];

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
      { "url": "https://t.me/syllabuserbaire", icon: <Send className="h-5 w-5 text-[#0088cc]"/>, "text": "টেলিগ্রাম চ্যানেল" },
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
      <header className="bg-white/95 px-4 lg:px-6 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <Link href="/">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/main/sb-logo.png" alt="Logo" width={160} height={40} quality={100} className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href={user ? '/dashboard' : '/login'} className="no-underline bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 uppercase">
              <UserRound size={16}/>
              <span className="font-montserrat">{user ? 'Dashboard' : 'Account'}</span>
          </Link>
          <button onClick={() => setShowMenu(!showMenu)} className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {showMenu && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-30">
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setShowMenu(false)} className="py-2 text-sm font-semibold text-gray-700 hover:text-primary">
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <Image src={course.image} alt={course.title} width={600} height={400} className="w-full h-auto object-cover rounded-2xl shadow-lg" data-ai-hint={course.imageHint} />
                </div>
                <div className="flex flex-col h-full">
                    <h1 className="text-3xl lg:text-4xl font-black font-montserrat mb-4">{course.title}</h1>
                    <div className="flex items-center gap-4 mb-6">
                        <span className={cn("text-white px-4 py-1 rounded-full text-lg font-semibold whitespace-nowrap", course.price === 'EXPIRED' ? 'bg-destructive' : 'bg-green-500')}>
                            {course.price}
                        </span>
                        {course.startDate && (
                            <div className="flex items-center text-lg text-gray-600">
                                <Calendar className="mr-2 text-accent" />
                                <span className="font-tiro-bangla">{course.startDate}</span>
                            </div>
                        )}
                    </div>
                    {course.description && <p className="text-lg leading-relaxed text-gray-700 font-tiro-bangla mb-6">{course.description}</p>}
                    
                    <div className="my-6">
                        <h3 className="font-bold text-2xl mb-4 font-tiro-bangla">কোর্সের ফিচারসমূহ</h3>
                        <div className="space-y-3">
                        {course.features.map(feature => (
                            <div key={feature} className="flex items-start">
                                <CheckCircle className="text-blue-500 mr-3 h-5 w-5 shrink-0 mt-1" />
                                <span className="font-tiro-bangla text-lg text-gray-800">{feature}</span>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button
                            onClick={executeRedirect}
                            disabled={course.disabled}
                            className={cn("inline-block bg-primary text-black px-8 py-4 rounded-lg no-underline font-bold text-lg mt-6 w-full transition-all duration-300 font-montserrat", 
                            course.disabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-yellow-500 hover:-translate-y-1 hover:shadow-lg")}>
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center font-tiro-bangla mb-8">কোর্স রুটিন</h2>
                <div className="overflow-x-auto">
                  <p className="text-center text-gray-500">কোর্স রুটিন খুব শীঘ্রই এখানে আপডেট করা হবে।</p>
                  {/* Placeholder for course routine table */}
                </div>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-gray-300 pt-16 pb-8 mt-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-block">
                <Image src={footerData.logo} alt="Footer Logo" width={70} height={70} quality={100} className="h-20 w-auto mb-4 mx-auto" />
            </div>
            <p className="mt-2 text-lg text-gray-400 max-w-md mx-auto font-tiro-bangla">{heroData.subtitle}</p>
            
            <div className="flex justify-center gap-8 my-8">
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
