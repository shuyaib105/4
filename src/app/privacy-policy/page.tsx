'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faHdd, faBan, faBug, faLock, faUserCircle, faBarsStaggered, faTimes, faShieldAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useFirebaseApp } from '@/firebase';

export default function PrivacyPolicyPage() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const app = useFirebaseApp();
  const auth = getAuth(app);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    await signOut(auth);
    toggleMenu();
  };

  const heroData = {
    subtitle: 'সহজ ব্যাখ্যা আর আধুনিক টেকনিকের মাধ্যমে আমরা তোমার সিলেবাসের ভয় দূর করবো ইনশাআল্লাহ্‌।'
  };
  
  const footerData = {
    logo: "https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png",
    links: [
      { "url": "https://t.me/syllabuserbaire", "icon": faTelegramPlane, "text": "টেলিগ্রাম চ্যানেল", "className": "text-[#0088cc]" },
      { "url": "/about", "icon": faInfoCircle, "text": "আমাদের সম্পর্কে", "className": "text-primary-blue" },
      { "url": "/privacy-policy", "icon": faShieldAlt, "text": "প্রাইভেসি পলিসি", "className": "text-success-green" }
    ],
    copyright: "&copy; 2025 SYLLABUSER BAIRE"
  };

  return (
    <div className="bg-[#FFFDF5] text-[#0f172a] antialiased">
        <style jsx>{`
            .policy-card {
                background: white;
                border: 1px solid rgba(184, 134, 11, 0.1);
                border-radius: 30px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.02);
                padding: 2.5rem;
                transition: 0.3s;
            }

            .policy-card:hover {
                border-color: #FFD200;
                box-shadow: 0 20px 50px rgba(184, 134, 11, 0.08);
            }

            .icon-box {
                width: 50px;
                height: 50px;
                background: #FFFDF5;
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #B8860B;
                font-size: 1.5rem;
                margin-bottom: 1.5rem;
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
      <header className="bg-white/95 px-[6%] py-1 flex justify-between items-center sticky top-0 z-[1000] shadow-sm h-[60px]">
        <Link href="/">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={45} height={45} quality={100} className="h-[45px] w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <Link href={user ? '/dashboard' : '/login'} className="no-underline bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 uppercase hover:bg-yellow-500 hover:text-black transition-all">
              <FontAwesomeIcon icon={faUserCircle} />
              <span>{user ? 'Dashboard' : 'Account'}</span>
          </Link>
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
          <li className="mb-5"><Link href={user ? "/dashboard" : "/login"} onClick={toggleMenu} className="no-underline text-foreground text-lg font-semibold">{user ? "ড্যাশবোর্ড" : "লগইন করুন"}</Link></li>
          {user && (
            <li><button onClick={handleLogout} className="no-underline text-red-500 text-lg font-semibold w-full text-left bg-transparent border-none">লগ আউট</button></li>
          )}
        </ul>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16" style={{lineHeight: 1.8}}>
        
        <header className="text-center mb-16">
            <h4 className="font-sans text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Security & Trust</h4>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">গোপনীয়তা <span className="text-accent">নীতি</span></h1>
            <p className="text-slate-500 max-w-2xl mx-auto">আপনার তথ্যের নিরাপত্তা আমাদের কাছে সর্বোচ্চ অগ্রাধিকার। আমরা কীভাবে আপনার তথ্য পরিচালনা করি তা নিচে স্বচ্ছভাবে ব্যাখ্যা করা হলো।</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
            
            <div className="policy-card">
                <div className="icon-box"><FontAwesomeIcon icon={faUserShield} /></div>
                <h3 className="text-xl font-bold mb-3">ব্যক্তিগত তথ্য সংগ্রহ</h3>
                <div className="gradient-line"></div>
                <p className="text-slate-600 text-sm">
                    আমরা আপনার কোনো <strong>Personal Data</strong> (নাম, ফোন নম্বর বা ইমেইল) সরাসরি সংগ্রহ করি না। আপনার সকল কার্যক্রম সম্পূর্ণ বেনামী থাকে।
                </p>
            </div>

            <div className="policy-card">
                <div className="icon-box"><FontAwesomeIcon icon={faHdd} /></div>
                <h3 className="text-xl font-bold mb-3">লোকাল স্টোরেজ ব্যবহার</h3>
                <div className="gradient-line"></div>
                <p className="text-slate-600 text-sm">
                    আপনার পরীক্ষার ফলাফল বা সেটিংস আপনার ডিভাইসের <strong>Local Storage</strong>-এ জমা থাকে। আপনি ব্রাউজার ক্যাশ পরিষ্কার করলে এই তথ্য মুছে যাবে।
                </p>
            </div>

            <div className="policy-card">
                <div className="icon-box"><FontAwesomeIcon icon={faBan} /></div>
                <h3 className="text-xl font-bold mb-3">নো সার্ভার ব্যাকআপ</h3>
                <div className="gradient-line"></div>
                <p className="text-slate-600 text-sm">
                    আমাদের কোনো <strong>Central Database বা Cloud Server</strong> নেই যেখানে আপনার ব্যক্তিগত তথ্য জমা রাখা হয়। ফলে আপনার ডেটা আমাদের কাছেও দৃশ্যমান নয়।
                </p>
            </div>

            <div className="policy-card">
                <div className="icon-box"><FontAwesomeIcon icon={faBug} /></div>
                <h3 className="text-xl font-bold mb-3">ক্লিন কোড ও বাগ চেক</h3>
                <div className="gradient-line"></div>
                <p className="text-slate-600 text-sm">
                    আমাদের ওয়েবসাইট অত্যন্ত <strong>Clean</strong> কোডিংয়ের মাধ্যমে তৈরি। আমরা নিয়মিত বাগ এবং সিকিউরিটি হোলগুলো চেক করি যেন আপনার ব্যবহারের অভিজ্ঞতা নিরবচ্ছিন্ন থাকে।
                </p>
            </div>

        </div>

        <div className="mt-16 bg-white border border-yellow-200 rounded-[40px] p-10 md:p-16 text-center">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                <FontAwesomeIcon icon={faLock} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">আপনার ডেটা, আপনার নিয়ন্ত্রণ</h3>
            <p className="text-slate-500 max-w-2xl mx-auto mb-8">
                যেহেতু আমরা আপনার কোনো ডেটা আমাদের সার্ভারে রাখি না, তাই আপনার ডেটা নিয়ে চিন্তার কোনো অবকাশ নেই। আপনার ব্যক্তিগত গোপনীয়তা বজায় রাখা আমাদের নৈতিক দায়িত্ব।
            </p>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent font-bold">Safe & Secure Learning Experience</p>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-gray-300 pt-16 pb-8 mt-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-block">
                <Image src={footerData.logo} alt="Footer Logo" width={60} height={60} quality={100} className="h-16 w-auto mb-2 mx-auto" />
            </div>
            <p className="mt-2 text-base text-gray-400 max-w-md mx-auto font-tiro-bangla">{heroData.subtitle}</p>
            
            <div className="flex justify-center gap-6 my-8">
                {footerData.links.map(link => (
                  <Link key={link.text} href={link.url} className="text-gray-300 hover:text-white font-medium transition-colors duration-300 text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={link.icon} className={cn("h-5 w-5", link.className)} />
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
