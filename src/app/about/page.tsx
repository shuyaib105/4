'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Brain, Lightbulb, Mail, Rocket, Fingerprint, Globe, UserCircle, Info, Shield, X } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useFirebaseApp } from '@/firebase';
import { FaGithub, FaTelegramPlane } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


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
  
  const footerData = {
    logo: "https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png",
    links: [
      { "url": "https://t.me/syllabuserbaire", icon: <FaTelegramPlane className="h-5 w-5 text-[#0088cc]"/>, "text": "টেলিগ্রাম চ্যানেল" },
      { "url": "/about", icon: <Info className="h-5 w-5 text-blue-500"/>, "text": "আমাদের সম্পর্কে" },
      { "url": "/privacy-policy", icon: <Shield className="h-5 w-5 text-green-500"/>, "text": "প্রাইভেসি পলিসি" }
    ],
    copyright: "&copy; 2025 SYLLABUSER BAIRE"
  };

  return (
    <div className="bg-[#FFFDF5] text-foreground antialiased">
      {/* Header */}
      <header className="bg-white/95 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <Link href="/">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={50} height={50} quality={100} className="h-[50px] w-auto" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">
              {link.text}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href={user ? '/dashboard' : '/login'} className="no-underline bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 uppercase hover:bg-yellow-500 hover:text-black transition-all">
              <UserCircle size={16} />
              <span>{user ? 'Dashboard' : 'Account'}</span>
          </Link>
           <button onClick={() => setShowMenu(!showMenu)} className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
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
      <section className="relative bg-gradient-to-br from-primary to-accent pt-16 pb-24 px-6 text-center text-white overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="font-sans font-bold text-xs tracking-[0.3em] bg-black/20 px-4 py-2 rounded-full mb-6 inline-block">WHO WE ARE</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">শিখুন প্রথাগত <br /> সীমানার বাইরে</h1>
          <p className="text-lg opacity-90 leading-relaxed font-medium font-tiro-bangla">
            "সিলেবাসের বাইরে" শুধু একটি প্ল্যাটফর্ম নয়, এটি একটি শিক্ষা বিপ্লব। আমরা বিশ্বাস করি প্রকৃত জ্ঞান কোনো নির্দিষ্ট বই বা সিলেবাসে সীমাবদ্ধ নয়।
          </p>
        </div>
        
        {/* Decoration */}
        <Brain className="absolute top-20 left-10 h-24 w-24 opacity-10 -rotate-12" />
        <Lightbulb className="absolute bottom-40 right-10 h-24 w-24 opacity-10 rotate-12" />

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-24">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#FFFDF5]"></path>
            </svg>
        </div>
      </section>

      {/* Content Sections */}
      <main className="container mx-auto px-6 -mt-12 relative z-20">
        
        {/* Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Founder Profile */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-yellow-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-40 h-40 rounded-[2.5rem] bg-yellow-400 overflow-hidden shadow-lg border-4 border-white shrink-0">
                        <Image src="https://raw.githubusercontent.com/MNRfrom2020/logo-and-icon-cdn/refs/heads/main/Logo/Shuyaib/Shuyaib.png" alt="Shuyaib Islam" width={160} height={160} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                        <span className="text-yellow-600 font-sans font-bold text-xs tracking-widest uppercase">Owner & Founder</span>
                        <h2 className="text-3xl font-black mt-1 mb-4 font-tiro-bangla">শুআইব ইসলাম</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed font-tiro-bangla">
                            "সিলেবাসের বাইরে" এর প্রতিষ্ঠাতা হিসেবে আমি শিক্ষার্থীদের গতানুগতিক ধারার বাইরে চিন্তা করতে এবং প্রযুক্তির সহায়তায় নিজেকে আরও দক্ষ করে গড়ে তুলতে উদ্বুদ্ধ করি।
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="mailto:mdshuyaibislam5050@gmail.com" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-all"><Mail /></a>
                            <a href="https://github.com/shuyaib105" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all"><FaGithub /></a>
                            <a href="https://t.me/shu_yaib" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all"><FaTelegramPlane /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advisor Profile */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-yellow-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-40 h-40 rounded-[2.5rem] bg-yellow-400 overflow-hidden shadow-lg border-4 border-white shrink-0">
                        <Image src="https://avatars.githubusercontent.com/u/175545919?v=4" alt="Frost Foe" width={160} height={160} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                        <span className="text-yellow-600 font-sans font-bold text-xs tracking-widest uppercase">Development Consultant</span>
                        <h2 className="text-3xl font-black mt-1 mb-4 font-tiro-bangla">Frost Foe</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed font-tiro-bangla">
                            প্ল্যাটফর্মের কারিগরি উন্নয়ন এবং ইনোভেশন নিশ্চিত করতে আমি ডেভেলপিং পরামর্শদাতা হিসেবে কাজ করছি। আমাদের লক্ষ্য একটি ত্রুটিমুক্ত ডিজিটাল লার্নিং এক্সপেরিয়েন্স তৈরি করা।
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="mailto:frostfoe@gmail.com" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-all"><Mail /></a>
                             <a href="https.me/frostfoe" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all"><FaTelegramPlane /></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Vision & Mission */}
        <div className="bg-white rounded-[4rem] p-16 shadow-2xl border border-yellow-50 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="space-y-4">
                    <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-inner">
                        <Rocket />
                    </div>
                    <h3 className="text-2xl font-bold font-tiro-bangla">লক্ষ্য</h3>
                    <p className="text-gray-500 leading-relaxed font-tiro-bangla">শিক্ষার্থীদের ডিজিটাল যুগে প্রতিযোগিতামূলক করার জন্য সিলেবাসের বাইরেও জ্ঞান আহরণে সহায়তা করা।</p>
                </div>
                <div className="space-y-4">
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-inner">
                        <Fingerprint />
                    </div>
                    <h3 className="text-2xl font-bold font-tiro-bangla">স্বকীয়তা</h3>
                    <p className="text-gray-500 leading-relaxed font-tiro-bangla">আমরা বিশ্বাস করি প্রতিটি শিক্ষার্থী অনন্য। তাই তাদের মেধা বিকাশে আমরা গতানুগতিক পদ্ধতির ঊর্ধ্বে কাজ করি।</p>
                </div>
                <div className="space-y-4">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-inner">
                        <Globe />
                    </div>
                    <h3 className="text-2xl font-bold font-tiro-bangla">ভবিষ্যৎ</h3>
                    <p className="text-gray-500 leading-relaxed font-tiro-bangla">আগামীর স্মার্ট বাংলাদেশ বিনির্মাণে দক্ষ জনবল তৈরিতে একটি পূর্ণাঙ্গ ই-লার্নিং হাব হয়ে ওঠা।</p>
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

    