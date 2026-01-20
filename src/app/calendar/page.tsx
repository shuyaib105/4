
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserRound, Menu, Send, Shield, Calendar as CalendarIcon, Clock, BookText } from 'lucide-react';
import { useUser } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

// Exam schedule data
const examSchedule = [
  { subject: 'পদার্থবিজ্ঞান ১ম পত্র', date: '2025-06-20T10:00:00' },
  { subject: 'পদার্থবিজ্ঞান ২য় পত্র', date: '2025-06-22T10:00:00' },
  { subject: 'রসায়ন ১ম পত্র', date: '2025-06-24T10:00:00' },
  { subject: 'রসায়ন ২য় পত্র', date: '2025-06-26T10:00:00' },
  { subject: 'উচ্চতর গণিত ১ম পত্র', date: '2025-06-28T10:00:00' },
  { subject: 'উচ্চতর গণিত ২য় পত্র', date: '2025-06-30T10:00:00' },
  { subject: 'জীববিজ্ঞান ১ম পত্র', date: '2025-07-02T10:00:00' },
  { subject: 'জীববিজ্ঞান ২য় পত্র', date: '2025-07-04T10:00:00' },
];

const Countdown = ({ targetDate }: { targetDate: string }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
        timeLeft = {
            দিন: Math.floor(difference / (1000 * 60 * 60 * 24)),
            ঘন্টা: Math.floor((difference / (1000 * 60 * 60)) % 24),
            মিনিট: Math.floor((difference / 1000 / 60) % 60),
            সেকেন্ড: Math.floor((difference / 1000) % 60),
        };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const timerComponents: JSX.Element[] = [];

    Object.entries(timeLeft).forEach(([interval, value]) => {
        timerComponents.push(
        <div key={interval} className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-accent">
            {value.toLocaleString('bn-BD')}
            </span>
            <span className="text-xs text-muted-foreground">{interval}</span>
        </div>
        );
    });
  
  return (
    <div className="flex justify-center gap-4 md:gap-6 mt-4">
      {timerComponents.length ? timerComponents : <span className="text-lg font-bold text-destructive">সময় শেষ!</span>}
    </div>
  );
};


export default function CalendarPage() {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUser();

  const navLinks = [
    { href: '/', text: 'হোম' },
    { href: '/#courses-section', text: 'কোর্সসমূহ' },
    { href: '/about', text: 'আমাদের সম্পর্কে' },
  ];

  const heroData = {
    subtitle: 'সহজ ব্যাখ্যা আর আধুনিক টেকনিকের মাধ্যমে আমরা তোমার সিলেবাসের ভয় দূর করবো ইনশাআল্লাহ্‌।'
  };

  return (
    <div className="bg-[#FFFDF5] text-foreground antialiased">
      {/* Header */}
      <header className="bg-white/95 px-2 lg:px-6 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <Link href="/">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={56} height={56} quality={100} className="h-14 w-auto" />
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href={user ? '/dashboard' : '/login'} className="no-underline bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 uppercase hover:bg-gray-800 transition-all">
              <UserRound size={16} className='bg-white text-black rounded-full p-0.5' />
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
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black mb-3 leading-tight font-tiro-bangla">
                HSC পরীক্ষার <span className="text-accent">সময়সূচি</span>
            </h1>
            <p className="text-lg text-gray-600 font-tiro-bangla">
                আপনার পরীক্ষার প্রস্তুতির জন্য কাউন্টডাউন শুরু।
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examSchedule.map((exam, index) => (
                <Card key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="text-center pb-4">
                        <div className="flex justify-center items-center gap-3">
                            <BookText className="w-6 h-6 text-primary" />
                            <CardTitle className="font-tiro-bangla text-2xl">{exam.subject}</CardTitle>
                        </div>
                         <p className="text-sm text-muted-foreground font-semibold flex items-center justify-center gap-2 pt-2">
                            <CalendarIcon className="w-4 h-4"/>
                            {format(new Date(exam.date), "d MMMM, yyyy", { locale: bn })}
                            <Clock className="w-4 h-4 ml-2"/>
                            {format(new Date(exam.date), "p", { locale: bn })}
                        </p>
                    </CardHeader>
                    <CardContent>
                       <Countdown targetDate={exam.date} />
                    </CardContent>
                </Card>
            ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Link href="/">
                <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Footer Logo" width={200} height={200} quality={100} />
              </Link>
              <p className="text-gray-600 font-tiro-bangla text-sm max-w-xs">
                {heroData.subtitle}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-base font-montserrat mb-4">গুরুত্বপূর্ণ লিংক</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-600 hover:text-primary transition-colors font-tiro-bangla text-sm">হোম</Link></li>
                <li><Link href="/#courses-section" className="text-gray-600 hover:text-primary transition-colors font-tiro-bangla text-sm">কোর্সসমূহ</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-primary transition-colors font-tiro-bangla text-sm">আমাদের সম্পর্কে</Link></li>
              </ul>
            </div>
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
