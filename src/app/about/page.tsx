'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Brain, Lightbulb, Mail, Rocket, Fingerprint, Globe, UserRound, Info, Shield, Github, Send, Menu, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useFirebaseApp } from '@/firebase';

export default function AboutPage() {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUser();
  const app = useFirebaseApp();
  const auth = getAuth(app);

  const navLinks = [
    { href: '/', text: 'হোম' },
    { href: '/#courses-section', text: 'কোর্সসমূহ' },
    { href: '/about', text: 'আমাদের সম্পর্কে' },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };
  
  const heroData = {
    subtitle: 'সহজ ব্যাখ্যা আর আধুনিক টেকনিকের মাধ্যমে আমরা তোমার সিলেবাসের ভয় দূর করবো ইনশাআল্লাহ্‌।'
  };

  return (
    <div className="bg-[#FFFDF5] text-foreground antialiased">
      {/* Header */}
      <header className="bg-white/95 px-2 lg:px-6 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <Link href="/">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={44} height={44} quality={100} className="h-11 w-auto" />
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
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent pt-12 pb-20 px-6 text-center text-white overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="font-sans font-bold text-xs tracking-[0.3em] bg-black/20 px-4 py-2 rounded-full mb-4 inline-block">WHO WE ARE</span>
          <h1 className="text-xl md:text-2xl font-black mb-3 leading-tight">শিখুন প্রথাগত <br /> সীমানার বাইরে</h1>
          <p className="text-xs opacity-90 leading-relaxed font-medium font-tiro-bangla">
            "সিলেবাসের বাইরে" শুধু একটি প্ল্যাটফর্ম নয়, এটি একটি শিক্ষা বিপ্লব। আমরা বিশ্বাস করি প্রকৃত জ্ঞান কোনো নির্দিষ্ট বই বা সিলেবাসে সীমাবদ্ধ নয়।
          </p>
        </div>
        
        {/* Decoration */}
        <Brain className="absolute top-20 left-10 h-8 w-8 opacity-10 -rotate-12" />
        <Lightbulb className="absolute bottom-40 right-10 h-8 w-8 opacity-10 rotate-12" />

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-24">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#FFFDF5]"></path>
            </svg>
        </div>
      </section>

      {/* Content Sections */}
      <main className="container mx-auto px-6 -mt-12 relative z-20">
        
        {/* Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            
            {/* Founder Profile */}
            <div className="bg-white p-5 rounded-3xl shadow-xl border border-yellow-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-yellow-400 overflow-hidden shadow-lg border-4 border-white shrink-0">
                        <Image src="https://raw.githubusercontent.com/MNRfrom2020/logo-and-icon-cdn/refs/heads/main/Logo/Shuyaib/Shuyaib.png" alt="Shuyaib Islam" width={80} height={80} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                        <span className="text-yellow-600 font-sans font-bold text-xs tracking-widest uppercase">Owner & Founder</span>
                        <h2 className="text-base font-black mt-1 mb-1 font-tiro-bangla">শুআইব ইসলাম</h2>
                        <p className="text-gray-600 text-xs mb-2 leading-relaxed font-tiro-bangla">
                            "সিলেবাসের বাইরে" এর প্রতিষ্ঠাতা হিসেবে আমি শিক্ষার্থীদের গতানুগতিক ধারার বাইরে চিন্তা করতে এবং প্রযুক্তির সহায়তায় নিজেকে আরও দক্ষ করে গড়ে তুলতে উদ্বুদ্ধ করি।
                        </p>
                        <div className="flex justify-center md:justify-start gap-1.5">
                            <a href="mailto:mdshuyaibislam5050@gmail.com" className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-all"><Mail size={14} /></a>
                            <a href="https://github.com/shuyaib105" className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all"><Github size={14} /></a>
                            <a href="https://t.me/shu_yaib" className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all"><Send size={14} /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advisor Profile */}
              <div className="bg-white p-5 rounded-3xl shadow-xl border border-yellow-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-yellow-400 overflow-hidden shadow-lg border-4 border-white shrink-0">
                        <Image src="https://avatars.githubusercontent.com/u/175545919?v=4" alt="Frost Foe" width={80} height={80} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                        <span className="text-yellow-600 font-sans font-bold text-xs tracking-widest uppercase">Development Consultant</span>
                        <h2 className="text-base font-black mt-1 mb-1 font-tiro-bangla">Frost Foe</h2>
                        <p className="text-gray-600 text-xs mb-2 leading-relaxed font-tiro-bangla">
                            প্ল্যাটফর্মের কারিগরি উন্নয়ন এবং ইনোভেশন নিশ্চিত করতে আমি ডেভেলপিং পরামর্শদাতা হিসেবে কাজ করছি। আমাদের লক্ষ্য একটি ত্রুটিমুক্ত ডিজিটাল লার্নিং এক্সপেরিয়েন্স তৈরি করা।
                        </p>
                        <div className="flex justify-center md:justify-start gap-1.5">
                            <a href="mailto:frostfoe@gmail.com" className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-all"><Mail size={14} /></a>
                             <a href="https.me/frostfoe" className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all"><Send size={14} /></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Vision & Mission */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-yellow-50 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                    <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mx-auto shadow-inner">
                        <Rocket size={20} />
                    </div>
                    <h3 className="text-sm font-bold font-tiro-bangla">লক্ষ্য</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-tiro-bangla">শিক্ষার্থীদের ডিজিটাল যুগে প্রতিযোগিতামূলক করার জন্য সিলেবাসের বাইরেও জ্ঞান আহরণে সহায়তা করা।</p>
                </div>
                <div className="space-y-2">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto shadow-inner">
                        <Fingerprint size={20} />
                    </div>
                    <h3 className="text-sm font-bold font-tiro-bangla">স্বকীয়তা</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-tiro-bangla">আমরা বিশ্বাস করি প্রতিটি শিক্ষার্থী অনন্য। তাই তাদের মেধা বিকাশে আমরা গতানুগতিক পদ্ধতির ঊর্ধ্বে কাজ করি।</p>
                </div>
                <div className="space-y-2">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto shadow-inner">
                        <Globe size={20} />
                    </div>
                    <h3 className="text-sm font-bold font-tiro-bangla">ভবিষ্যৎ</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-tiro-bangla">আগামীর স্মার্ট বাংলাদেশ বিনির্মাণে দক্ষ জনবল তৈরিতে একটি পূর্ণাঙ্গ ই-লার্নিং হাব হয়ে ওঠা।</p>
                </div>
            </div>
        </div>

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
