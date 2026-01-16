'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faLightbulb, faEnvelope, faRocket, faFingerprint, faGlobe, faUserCircle, faBarsStaggered, faTimes, faInfoCircle, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.reload();
  };
  
  const heroData = {
    subtitle: 'সহজ ব্যাখ্যা আর আধুনিক টেকনিকের মাধ্যমে আমরা তোমার সিলেবাসের ভয় দূর করবো ইনশাআল্লাহ্‌।'
  };
  
  const footerData = {
    logo: "https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png",
    links: [
      { "url": "https://t.me/syllabuserbaire", "icon": faTelegramPlane, "text": "টেলিগ্রাম চ্যানেল", "color": "#0088cc" },
      { "url": "/about", "icon": faInfoCircle, "text": "আমাদের সম্পর্কে", "color": "hsl(var(--primary-blue))" },
      { "url": "/privacy-policy", "icon": faShieldAlt, "text": "প্রাইভেসি পলিসি", "color": "hsl(var(--success-green))" }
    ],
    copyright: "&copy; 2025 SYLLABUSER BAIRE"
  };

  return (
    <div className="bg-[#FFFDF5] text-foreground antialiased">
      {/* Header */}
      <header className="bg-white/95 px-[6%] py-1 flex justify-between items-center sticky top-0 z-[1000] shadow-sm h-[70px]">
        <Link href="/">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={55} height={55} quality={100} className="h-[55px] w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <a href={isLoggedIn ? 'dashboard.html' : 'login.html'} className="no-underline bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 uppercase hover:bg-yellow-500 hover:text-black transition-all">
              <FontAwesomeIcon icon={faUserCircle} />
              <span>{isLoggedIn ? 'Dashboard' : 'Account'}</span>
          </a>
          <div className="text-2xl cursor-pointer text-foreground" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBarsStaggered} />
          </div>
        </div>
      </header>
      
      {/* Side Menu */}
      <div className={cn("fixed top-0 w-[280px] h-full bg-white z-[1001] shadow-xl transition-all duration-400 ease-in-out p-10 pt-5", menuOpen ? "right-0" : "-right-[280px]")}>
        <div className="absolute top-4 left-5 text-2xl cursor-pointer" onClick={toggleMenu}><FontAwesomeIcon icon={faTimes} /></div>
        <ul className="list-none mt-8">
          <li className="mb-5"><Link href="/" onClick={toggleMenu} className="no-underline text-foreground text-lg font-semibold">হোম</Link></li>
          <li className="mb-5"><a href="/#courses-section" onClick={toggleMenu} className="no-underline text-foreground text-lg font-semibold">কোর্সসমূহ</a></li>
          <li className="mb-5"><Link href="/about" onClick={toggleMenu} className="no-underline text-foreground text-lg font-semibold">আমাদের সম্পর্কে</Link></li>
          <li className="mb-5"><a href={isLoggedIn ? "dashboard.html" : "login.html"} className="no-underline text-foreground text-lg font-semibold">{isLoggedIn ? "ড্যাশবোর্ড" : "লগইন করুন"}</a></li>
          {isLoggedIn && (
            <li><a href="#" onClick={handleLogout} className="no-underline text-red-500 text-lg font-semibold">লগ আউট</a></li>
          )}
        </ul>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-accent pt-20 pb-32 px-6 text-center text-white overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="font-sans font-bold text-xs tracking-[0.3em] bg-black/20 px-4 py-2 rounded-full mb-6 inline-block">WHO WE ARE</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">শিখুন প্রথাগত <br /> সীমানার বাইরে</h1>
          <p className="text-lg opacity-90 leading-relaxed font-medium">
            "সিলেবাসের বাইরে" শুধু একটি প্ল্যাটফর্ম নয়, এটি একটি শিক্ষা বিপ্লব। আমরা বিশ্বাস করি প্রকৃত জ্ঞান কোনো নির্দিষ্ট বই বা সিলেবাসে সীমাবদ্ধ নয়।
          </p>
        </div>
        
        {/* Decoration */}
        <FontAwesomeIcon icon={faBrain} className="absolute top-20 left-10 text-9xl opacity-10 -rotate-12" />
        <FontAwesomeIcon icon={faLightbulb} className="absolute bottom-40 right-10 text-9xl opacity-10 rotate-12" />

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-20">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#FFFDF5]"></path>
            </svg>
        </div>
      </section>

      {/* Content Sections */}
      <main className="container mx-auto px-6 -mt-16 relative z-20">
        
        {/* Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            
            {/* Founder Profile */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-yellow-100 hover:-translate-y-2.5 hover:shadow-lg transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-40 h-40 rounded-[2.5rem] bg-yellow-400 overflow-hidden shadow-lg border-4 border-white shrink-0">
                        <Image src="https://raw.githubusercontent.com/MNRfrom2020/logo-and-icon-cdn/refs/heads/main/Logo/Shuyaib/Shuyaib.png" alt="Shuyaib Islam" width={160} height={160} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                        <span className="text-yellow-600 font-sans font-bold text-xs tracking-widest uppercase">Owner & Founder</span>
                        <h2 className="text-3xl font-black mt-1 mb-4">শুআইব ইসলাম</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            "সিলেবাসের বাইরে" এর প্রতিষ্ঠাতা হিসেবে আমি শিক্ষার্থীদের গতানুগতিক ধারার বাইরে চিন্তা করতে এবং প্রযুক্তির সহায়তায় নিজেকে আরও দক্ষ করে গড়ে তুলতে উদ্বুদ্ধ করি।
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="mailto:mdshuyaibislam5050@gmail.com" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-all"><FontAwesomeIcon icon={faEnvelope} /></a>
                            <a href="https://github.com/shuyaib105" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all"><FontAwesomeIcon icon={faGithub} /></a>
                            <a href="https://t.me/shu_yaib" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all"><FontAwesomeIcon icon={faTelegramPlane} /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advisor Profile */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-yellow-100 hover:-translate-y-2.5 hover:shadow-lg transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-40 h-40 rounded-[2.5rem] bg-yellow-400 overflow-hidden shadow-lg border-4 border-white shrink-0">
                        <Image src="https://avatars.githubusercontent.com/u/175545919?v=4" alt="Frost Foe" width={160} height={160} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                        <span className="text-yellow-600 font-sans font-bold text-xs tracking-widest uppercase">Development Consultant</span>
                        <h2 className="text-3xl font-black mt-1 mb-4">Frost Foe</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            প্ল্যাটফর্মের কারিগরি উন্নয়ন এবং ইনোভেশন নিশ্চিত করতে আমি ডেভেলপিং পরামর্শদাতা হিসেবে কাজ করছি। আমাদের লক্ষ্য একটি ত্রুটিমুক্ত ডিজিটাল লার্নিং এক্সপেরিয়েন্স তৈরি করা।
                        </p>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="mailto:frostfoe@gmail.com" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-all"><FontAwesomeIcon icon={faEnvelope} /></a>
                             <a href="https://t.me/frostfoe" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-all"><FontAwesomeIcon icon={faTelegramPlane} /></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Vision & Mission */}
        <div className="bg-white rounded-[4rem] p-12 shadow-2xl border border-yellow-50 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="space-y-4">
                    <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-inner">
                        <FontAwesomeIcon icon={faRocket} />
                    </div>
                    <h3 className="text-xl font-bold">লক্ষ্য</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">শিক্ষার্থীদের ডিজিটাল যুগে প্রতিযোগিতামূলক করার জন্য সিলেবাসের বাইরেও জ্ঞান আহরণে সহায়তা করা।</p>
                </div>
                <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-inner">
                        <FontAwesomeIcon icon={faFingerprint} />
                    </div>
                    <h3 className="text-xl font-bold">স্বকীয়তা</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">আমরা বিশ্বাস করি প্রতিটি শিক্ষার্থী অনন্য। তাই তাদের মেধা বিকাশে আমরা গতানুগতিক পদ্ধতির ঊর্ধ্বে কাজ করি।</p>
                </div>
                <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-inner">
                        <FontAwesomeIcon icon={faGlobe} />
                    </div>
                    <h3 className="text-xl font-bold">ভবিষ্যৎ</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">আগামীর স্মার্ট বাংলাদেশ বিনির্মাণে দক্ষ জনবল তৈরিতে একটি পূর্ণাঙ্গ ই-লার্নিং হাব হয়ে ওঠা।</p>
                </div>
            </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-gray-300 pt-16 pb-8 mt-20 rounded-t-3xl">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
                <Image src={footerData.logo} alt="Footer Logo" width={60} height={60} quality={100} className="h-16 w-auto mb-2" />
                <p className="mt-2 text-base text-gray-400 max-w-md">{heroData.subtitle}</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 my-10">
                {footerData.links.map(link => (
                  <Link key={link.text} href={link.url} className="flex items-center gap-2.5 text-gray-300 hover:text-white hover:scale-105 transition-all duration-300 text-base">
                    <FontAwesomeIcon icon={link.icon} className="h-5 w-5" style={{color: link.color}}/>
                    <span className="font-medium">{link.text}</span>
                  </Link>
                ))}
            </div>
            
            <div className="mt-10 pt-8 border-t border-zinc-800 text-center">
                <p className="text-sm text-zinc-500" dangerouslySetInnerHTML={{ __html: footerData.copyright }} />
            </div>
        </div>
      </footer>
    </div>
  );
}
