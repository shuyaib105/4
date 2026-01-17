'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserCircle, BookOpen, Calendar, Info, Shield } from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { courseTabsData } from '@/lib/courses';

const heroData = {
  title: 'তোমার <span class="text-accent">সেরা প্রস্তুতির</span> শুরু হোক এখানে থেকেই',
  subtitle: 'সহজ ব্যাখ্যা আর আধুনিক টেকনিকের মাধ্যমে আমরা তোমার সিলেবাসের ভয় দূর করবো ইনশাআল্লাহ্‌।'
};

const actionButtonsData = [
  { url: "#courses-section", title: "কোর্স সমূহ", icon: BookOpen },
  { url: "#", title: "ক্যালেন্ডার", icon: Calendar },
];

const footerData = {
  logo: "https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png",
  links: [
    { "url": "https://t.me/syllabuserbaire", icon: <FaTelegramPlane className="h-5 w-5 text-[#0088cc]"/>, "text": "টেলিগ্রাম চ্যানেল" },
    { "url": "/about", icon: <Info className="h-5 w-5 text-blue-500"/>, "text": "আমাদের সম্পর্কে" },
    { "url": "/privacy-policy", icon: <Shield className="h-5 w-5 text-green-500"/>, "text": "প্রাইভেসি পলিসি" }
  ],
  copyright: "&copy; 2025 SYLLABUSER BAIRE"
};


export default function Home() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(courseTabsData[0].id);
  
  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="bg-white/95 px-[6%] py-2.5 flex justify-between items-center sticky top-0 z-10 shadow-sm h-[70px]">
        <Link href="/">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={45} height={45} quality={100} className="h-[45px] w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <Link href={user ? "/dashboard" : "/login"} className="no-underline bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 uppercase">
            <UserCircle size={14} />
            <span className="font-montserrat">{user ? "Dashboard" : "Account"}</span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-yellow-50 to-background">
          <div className="container mx-auto px-6 pt-8 lg:pt-12 pb-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight font-tiro-bangla" dangerouslySetInnerHTML={{ __html: heroData.title }} />
                <p className="text-xl mb-10 text-gray-600 leading-relaxed font-tiro-bangla">{heroData.subtitle}</p>
                <div className="flex flex-wrap gap-4">
                  {actionButtonsData.map(button => (
                      <a key={button.title} href={button.url} className="bg-white rounded-2xl flex items-center justify-center no-underline shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-8 py-5">
                          <div className="flex items-center gap-3">
                              <button.icon className="text-2xl text-accent" />
                              <span className="text-lg font-bold text-gray-800 font-tiro-bangla">{button.title}</span>
                          </div>
                      </a>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex justify-center items-center">
                <Image 
                  src="https://picsum.photos/seed/online-class/600/600"
                  width={600}
                  height={600}
                  alt="Online Learning"
                  className="rounded-full shadow-2xl"
                  data-ai-hint="online learning student"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses-section" className="py-16 px-[8%] text-center">
            <div className="bg-gray-200 p-1.5 rounded-xl inline-flex mb-8">
                {courseTabsData.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("px-5 py-2 border-none bg-transparent cursor-pointer text-base font-semibold rounded-lg text-gray-600 transition-all font-montserrat", activeTab === tab.id && "bg-white text-accent shadow-md")}>
                        {tab.name}
                    </button>
                ))}
            </div>

            {courseTabsData.map(tab => (
                <div key={tab.id} className={cn("grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all", activeTab === tab.id ? "grid" : "hidden")}>
                    {tab.courses.map(course => (
                        <div key={course.title} className="bg-white rounded-2xl overflow-hidden text-left shadow-lg transition-all duration-400 hover:-translate-y-1 hover:shadow-xl">
                            <Image src={course.image} alt={course.title} width={400} height={180} className="w-full h-44 object-cover" data-ai-hint={course.imageHint} />
                            <div className="p-5">
                                <h3 className="text-xl font-bold mb-2.5 flex justify-between items-start font-montserrat">
                                    <span className="flex-1 pr-2">{course.title}</span>
                                    <span className={cn("text-white px-3 py-1 rounded-full text-sm font-semibold ml-2.5 align-middle whitespace-nowrap", course.price === 'EXPIRED' ? 'bg-destructive' : 'bg-green-500')}>
                                        {course.price}
                                    </span>
                                </h3>
                                
                                <Link
                                    href={`/courses/${course.id}`}
                                    className={cn("inline-block text-center bg-primary text-black px-5 py-2.5 rounded-lg no-underline font-bold mt-4 w-full transition-all duration-300 font-montserrat", 
                                    course.disabled ? "bg-gray-400 cursor-not-allowed pointer-events-none" : "hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-lg")}>
                                    View Course details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </section>
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
