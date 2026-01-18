'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserRound, BookOpen, Calendar, Info, Shield, Send, Menu, BookCopy } from 'lucide-react';
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
  { url: "#courses-section", title: "প্রশ্নব্যাংক", icon: BookCopy },
];


export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(courseTabsData[0].id);

  const navLinks = [
    { href: '/', text: 'হোম' },
    { href: '/#courses-section', text: 'কোর্সসমূহ' },
    { href: '/about', text: 'আমাদের সম্পর্কে' },
  ];
  
  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="bg-white/95 px-2 lg:px-6 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <Link href="/">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={44} height={44} quality={100} className="h-11 w-auto" />
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href={user ? "/dashboard" : "/login"} className="no-underline bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 uppercase hover:bg-gray-800 transition-all">
            <UserRound size={16} className='bg-white text-black rounded-full p-0.5' />
            <span className="font-montserrat">{user ? "Dashboard" : "Account"}</span>
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

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-yellow-50 to-background">
          <div className="container mx-auto px-6 pt-16 pb-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight font-tiro-bangla" dangerouslySetInnerHTML={{ __html: heroData.title }} />
                <p className="text-xl mb-10 text-gray-600 leading-relaxed font-tiro-bangla">{heroData.subtitle}</p>
                <div className="flex gap-4">
                  {actionButtonsData.map(button => (
                      <a key={button.title} href={button.url} className="bg-white rounded-xl flex items-center justify-center no-underline shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-6 py-3">
                          <div className="flex items-center gap-3">
                              <button.icon className="text-2xl text-accent" />
                              <span className="text-base font-bold text-gray-800 font-tiro-bangla">{button.title}</span>
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
        <section id="courses-section" className="pt-8 pb-20 px-[8%] text-center">
            <div className="bg-gray-200 p-2 rounded-xl inline-flex mb-10">
                {courseTabsData.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("px-6 py-2 border-none bg-transparent cursor-pointer text-base font-semibold rounded-lg text-gray-600 transition-all font-montserrat", activeTab === tab.id && "bg-white text-accent shadow-md")}>
                        {tab.name}
                    </button>
                ))}
            </div>

            {courseTabsData.map(tab => (
                <div key={tab.id} className={cn("grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all", activeTab === tab.id ? "grid" : "hidden")}>
                    {tab.courses.map(course => (
                        <div key={course.title} className="bg-white rounded-2xl overflow-hidden text-left shadow-lg transition-all duration-400 hover:-translate-y-2 hover:shadow-xl">
                            <Image src={course.image} alt={course.title} width={400} height={200} className="w-full h-48 object-cover" data-ai-hint={course.imageHint} />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 flex justify-between items-start font-montserrat">
                                    <span className="flex-1 pr-2">{course.title}</span>
                                    <span className={cn("text-white px-3 py-1 rounded-full text-sm font-semibold ml-2 align-middle whitespace-nowrap", course.price === 'EXPIRED' ? 'bg-destructive' : 'bg-green-500')}>
                                        {course.price}
                                    </span>
                                </h3>
                                
                                <Link
                                    href={`/courses/${course.id}`}
                                    className={cn("inline-block text-center bg-primary text-black px-6 py-3 rounded-lg no-underline font-bold mt-4 w-full transition-all duration-300 font-montserrat", 
                                    course.disabled ? "bg-gray-400 cursor-not-allowed pointer-events-none" : "hover:bg-yellow-500 hover:-translate-y-1 hover:shadow-lg")}>
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
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Logo and Description */}
            <div className="space-y-4">
              <Link href="/">
                <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Footer Logo" width={200} height={200} quality={100} />
              </Link>
              <p className="text-gray-600 font-tiro-bangla text-sm max-w-xs">
                {heroData.subtitle}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-bold text-base font-montserrat mb-4">গুরুত্বপূর্ণ লিংক</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-600 hover:text-primary transition-colors font-tiro-bangla text-sm">হোম</Link></li>
                <li><Link href="/#courses-section" className="text-gray-600 hover:text-primary transition-colors font-tiro-bangla text-sm">কোর্সসমূহ</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-primary transition-colors font-tiro-bangla text-sm">আমাদের সম্পর্কে</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact & Social */}
            <div>
              <h3 className="font-bold text-base font-montserrat mb-4">যোগাযোগ</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://t.me/syllabuserbaire" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm">
                    <Send size={16} />
                    <span className="font-tiro-bangla">টেলিগ্রাম চ্যানেল</span>
                  </a>
                </li>
                <li>
                   <Link href="/privacy-policy" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm">
                    <Shield size={16} />
                    <span className="font-tiro-bangla">প্রাইভেসি পলিসি</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t text-center">
            <p className="text-sm text-gray-500 font-montserrat">
              &copy; {new Date().getFullYear()} SYLLABUSER BAIRE. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
