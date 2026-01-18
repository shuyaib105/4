'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Database, Ban, Bug, Lock, UserRound, Info, Shield, Menu, Send } from 'lucide-react';
import { useUser } from '@/firebase';
import { useState } from 'react';

export default function PrivacyPolicyPage() {
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  const navLinks = [
    { href: '/', text: 'হোম' },
    { href: '/#courses-section', text: 'কোর্সসমূহ' },
    { href: '/about', text: 'আমাদের সম্পর্কে' },
  ];

  const heroData = {
    subtitle: 'সহজ ব্যাখ্যা আর আধুনিক টেকনিকের মাধ্যমে আমরা তোমার সিলেবাসের ভয় দূর করবো ইনশাআল্লাহ্‌।'
  };
  
  return (
    <div className="bg-[#FFFDF5] text-[#0f172a] antialiased">
        <style jsx>{`
            .policy-card {
                background: white;
                border: 1px solid rgba(184, 134, 11, 0.1);
                border-radius: 30px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.05);
                padding: 3rem;
                transition: 0.3s;
            }

            .policy-card:hover {
                transform: translateY(-5px);
                border-color: #FFD200;
                box-shadow: 0 20px 50px rgba(184, 134, 11, 0.1);
            }

            .icon-box {
                width: 60px;
                height: 60px;
                background: #FFFDF5;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #B8860B;
                font-size: 2rem;
                margin-bottom: 2rem;
            }

            .gradient-line {
                height: 4px;
                width: 80px;
                background: linear-gradient(90deg, #B8860B, #FFD200);
                border-radius: 10px;
                margin: 1.5rem 0;
            }
        `}</style>
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
      
      <main className="max-w-5xl mx-auto px-6 py-20" style={{lineHeight: 1.8}}>
        
        <header className="text-center mb-16">
            <h4 className="font-sans text-accent font-bold tracking-[0.4em] uppercase text-sm mb-4">Security & Trust</h4>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-tiro-bangla">গোপনীয়তা <span className="text-accent">নীতি</span></h1>
            <p className="text-slate-500 max-w-2xl mx-auto font-tiro-bangla">আপনার তথ্যের নিরাপত্তা আমাদের কাছে সর্বোচ্চ অগ্রাধিকার। আমরা কীভাবে আপনার তথ্য পরিচালনা করি তা নিচে স্বচ্ছভাবে ব্যাখ্যা করা হলো।</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
            
            <div className="policy-card">
                <div className="icon-box"><ShieldCheck /></div>
                <h3 className="text-xl font-bold mb-3 font-tiro-bangla">ব্যক্তিগত তথ্য সংগ্রহ</h3>
                <div className="gradient-line"></div>
                <p className="text-slate-600 font-tiro-bangla">
                    আমরা আপনার কোনো <strong>Personal Data</strong> (নাম, ফোন নম্বর বা ইমেইল) সরাসরি সংগ্রহ করি না। আপনার সকল কার্যক্রম সম্পূর্ণ বেনামী থাকে।
                </p>
            </div>

            <div className="policy-card">
                <div className="icon-box"><Database /></div>
                <h3 className="text-xl font-bold mb-3 font-tiro-bangla">লোকাল স্টোরেজ ব্যবহার</h3>
                <div className="gradient-line"></div>
                <p className="text-slate-600 font-tiro-bangla">
                    আপনার পরীক্ষার ফলাফল বা সেটিংস আপনার ডিভাইসের <strong>Local Storage</strong>-এ জমা থাকে। আপনি ব্রাউজার ক্যাশ পরিষ্কার করলে এই তথ্য মুছে যাবে।
                </p>
            </div>

            <div className="policy-card">
                <div className="icon-box"><Ban /></div>
                <h3 className="text-xl font-bold mb-3 font-tiro-bangla">নো সার্ভার ব্যাকআপ</h3>
                <div className="gradient-line"></div>
                <p className="text-slate-600 font-tiro-bangla">
                    আমাদের কোনো <strong>Central Database বা Cloud Server</strong> নেই যেখানে আপনার ব্যক্তিগত তথ্য জমা রাখা হয়। ফলে আপনার ডেটা আমাদের কাছেও দৃশ্যমান নয়।
                </p>
            </div>

            <div className="policy-card">
                <div className="icon-box"><Bug /></div>
                <h3 className="text-xl font-bold mb-3 font-tiro-bangla">ক্লিন কোড ও বাগ চেক</h3>
                <div className="gradient-line"></div>
                <p className="text-slate-600 font-tiro-bangla">
                    আমাদের ওয়েবসাইট অত্যন্ত <strong>Clean</strong> কোডিংয়ের মাধ্যমে তৈরি। আমরা নিয়মিত বাগ এবং সিকিউরিটি হোলগুলো চেক করি যেন আপনার ব্যবহারের অভিজ্ঞতা নিরবচ্ছিন্ন থাকে।
                </p>
            </div>

        </div>

        <div className="mt-20 bg-white border border-yellow-200 rounded-[40px] p-10 md:p-20 text-center">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                <Lock />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4 font-tiro-bangla">আপনার ডেটা, আপনার নিয়ন্ত্রণ</h3>
            <p className="text-slate-500 max-w-2xl mx-auto mb-8 font-tiro-bangla">
                যেহেতু আমরা আপনার কোনো ডেটা আমাদের সার্ভারে রাখি না, তাই আপনার ডেটা নিয়ে চিন্তার কোনো অবকাশ নেই। আপনার ব্যক্তিগত গোপনীয়তা বজায় রাখা আমাদের নৈতিক দায়িত্ব।
            </p>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-accent font-bold">Safe & Secure Learning Experience</p>
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

    