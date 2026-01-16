'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBarsStaggered, faTimes, faCertificate, faUserLock, faCheckCircle, faInfoCircle, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { cn } from '@/lib/utils';

const heroData = {
  title: 'তোমার <span class="text-accent">সেরা প্রস্তুতির</span> শুরু হোক এখানে থেকেই',
  subtitle: 'সহজ ব্যাখ্যা আর আধুনিক টেকনিকের মাধ্যমে আমরা তোমার সিলেবাসের ভয় দূর করবো ইনশাআল্লাহ্‌।'
};

const actionButtonsData = [
  { "url": "#", "image": "https://picsum.photos/seed/action1/160/75", "title": "HSC", "imageHint": "student studying" },
  { "url": "#", "image": "https://picsum.photos/seed/action2/160/75", "title": "SSC", "imageHint": "books classroom" }
];

const courseTabsData = [
  {
    "name": "HSC 25",
    "id": "hsc-25",
    "courses": [
      {
        "title": "পদার্থবিজ্ঞান ১ম পত্র",
        "price": "৳550",
        "description": "সম্পূর্ণ নতুন সিলেবাস অনুযায়ী থিওরি এবং গাণিতিক সমস্যার সমাধান।",
        "features": ["সকল অধ্যায়ের ক্লাস", "রেকর্ডেড লেকচার", "সাপ্তাহিক পরীক্ষা"],
        "enrollButton": "Enroll Now",
        "image": "https://picsum.photos/seed/physics1/400/180",
        "imageHint": "physics abstract",
        "disabled": false,
        "enrollAction": "openEnrollPopup('পদার্থবিজ্ঞান ১ম পত্র')"
      },
      {
        "title": "রসায়ন ২য় পত্র",
        "price": "EXPIRED",
        "features": ["সকল অধ্যায়ের ক্লাস", "রেকর্ডেড লেকচার", "মাসিক পরীক্ষা"],
        "enrollButton": "Admission Closed",
        "image": "https://picsum.photos/seed/chem2/400/180",
        "imageHint": "chemistry lab",
        "disabled": true
      }
    ]
  },
  {
    "name": "HSC 26",
    "id": "hsc-26",
    "courses": [
      {
        "title": "উচ্চতর গণিত",
        "price": "৳600",
        "description": "সহজ পদ্ধতিতে জটিল সব গাণিতিক সমস্যার সমাধান।",
        "features": ["সকল অধ্যায়ের ক্লাস", "লাইভ প্রশ্নোত্তর পর্ব", "মডেল টেস্ট"],
        "enrollButton": "Enroll Now",
        "image": "https://picsum.photos/seed/math/400/180",
        "imageHint": "mathematics chalkboard",
        "disabled": false,
        "enrollAction": "openEnrollPopup('উচ্চতর গণিত')"
      }
    ]
  }
];


const footerData = {
  logo: "https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png",
  links: [
    { "url": "https://t.me/syllabuserbaire", "icon": faTelegramPlane, "text": "টেলিগ্রাম চ্যানেল", "color": "#0088cc" },
    { "url": "#", "icon": faInfoCircle, "text": "আমাদের সম্পর্কে", "color": "hsl(var(--primary-blue))" },
    { "url": "#", "icon": faShieldAlt, "text": "প্রাইভেসি পলিসি", "color": "hsl(var(--success-green))" }
  ],
  copyright: "&copy; 2025 SYLLABUSER BAIRE"
};


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(courseTabsData[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState('');

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.reload();
  };

  const openEnrollPopup = (courseName: string) => {
    setModalCourse(courseName);
    setModalOpen(true);
  };
  
  const executeRedirect = () => {
    const encodedCourseName = encodeURIComponent(modalCourse);
    if (isLoggedIn) {
        window.location.href = `dashboard.html?course=${encodedCourseName}`;
    } else {
        window.location.href = `login.html?course=${encodedCourseName}`;
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* Enroll Popup Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[2000]" onClick={() => setModalOpen(false)}>
          <div className="bg-white p-8 rounded-3xl w-[90%] max-w-md text-center shadow-2xl animate-popIn border-2 border-gray-100" onClick={(e) => e.stopPropagation()}>
            <div className="w-24 h-24 bg-[#fffdf0] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
              <FontAwesomeIcon icon={isLoggedIn ? faCertificate : faUserLock} className={cn("text-5xl", isLoggedIn ? "text-accent" : "text-primary-blue")} />
            </div>
            <span className="font-extrabold text-xl block mb-3 text-gray-800 tracking-tight">{modalCourse}</span>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {isLoggedIn ? "Dashboard-এ কোর্সটি যুক্ত করা হচ্ছে..." : "লগইন করার পর এই কোর্সটি অটোমেটিক সিলেক্ট করা হবে।"}
            </p>
            <button onClick={executeRedirect} className="bg-black text-white p-4 rounded-xl font-extrabold text-base w-full uppercase transition-all duration-300 hover:bg-accent hover:-translate-y-0.5 shadow-lg">
              Proceed to Enroll
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/95 px-[6%] py-1 flex justify-between items-center sticky top-0 z-[1000] shadow-sm h-[70px]">
        <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={55} height={55} quality={100} className="h-[55px] w-auto" />
        <div className="flex items-center gap-3">
          <a href={isLoggedIn ? "dashboard.html" : "login.html"} className="no-underline bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 uppercase">
            <FontAwesomeIcon icon={faUserCircle} />
            <span>{isLoggedIn ? "Dashboard" : "Account"}</span>
          </a>
          <div className="text-2xl cursor-pointer text-text-main" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBarsStaggered} />
          </div>
        </div>
      </header>

      {/* Side Menu */}
      <div className={cn("fixed top-0 w-[280px] h-full bg-white z-[1001] shadow-xl transition-all duration-400 ease-in-out p-10 pt-5", menuOpen ? "right-0" : "-right-[280px]")}>
        <div className="absolute top-4 left-5 text-2xl cursor-pointer" onClick={toggleMenu}><FontAwesomeIcon icon={faTimes} /></div>
        <ul className="list-none mt-8">
          <li className="mb-5"><a href="#" onClick={toggleMenu} className="no-underline text-text-main text-lg font-semibold">হোম</a></li>
          <li className="mb-5"><a href="#courses-section" onClick={toggleMenu} className="no-underline text-text-main text-lg font-semibold">কোর্সসমূহ</a></li>
          <li className="mb-5"><a href="about.html" onClick={toggleMenu} className="no-underline text-text-main text-lg font-semibold">আমাদের সম্পর্কে</a></li>
          <li className="mb-5"><a href={isLoggedIn ? "dashboard.html" : "login.html"} className="no-underline text-text-main text-lg font-semibold">{isLoggedIn ? "ড্যাশবোর্ড" : "লগইন করুন"}</a></li>
          {isLoggedIn && (
            <li><a href="#" onClick={handleLogout} className="no-underline text-red-500 text-lg font-semibold">লগ আউট</a></li>
          )}
        </ul>
      </div>

      <main className="bg-background">
        {/* Hero Section */}
        <section className="flex items-center justify-between px-[8%] py-10 flex-wrap gap-5">
          <div className="flex-1 min-w-[300px]">
            <h1 className="text-4xl mb-4 font-bold leading-tight" dangerouslySetInnerHTML={{ __html: heroData.title }} />
            <p className="text-xl mb-6 leading-relaxed text-gray-700">{heroData.subtitle}</p>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 px-[8%] -mt-5">
            {actionButtonsData.map(button => (
                <a key={button.title} href={button.url} className="w-40 h-[75px] bg-cover bg-center rounded-xl flex items-center justify-center no-underline relative overflow-hidden shadow-md transition-all duration-400 hover:-translate-y-1 hover:shadow-lg" style={{backgroundImage: `url(${button.image})`}}>
                    <div className="absolute inset-0 bg-black/45"></div>
                    <span className="relative z-10 text-white text-base font-extrabold text-shadow-lg">{button.title}</span>
                </a>
            ))}
        </div>

        {/* Courses Section */}
        <section id="courses-section" className="py-20 px-[8%] text-center">
            <div className="bg-gray-200 p-1.5 rounded-xl inline-flex mb-8">
                {courseTabsData.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("px-5 py-2 border-none bg-transparent cursor-pointer text-base font-semibold rounded-lg text-gray-600 transition-all", activeTab === tab.id && "bg-white text-accent shadow-md")}>
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
                                <h3 className="text-xl mb-2.5 flex justify-between items-center">
                                    {course.title} 
                                    <span className={cn("text-white px-3 py-1 rounded-full text-sm font-semibold ml-2.5 align-middle", course.price === 'EXPIRED' ? 'bg-destructive' : 'bg-success-green')}>
                                        {course.price}
                                    </span>
                                </h3>
                                {course.description && <p className="text-base leading-snug text-gray-600">{course.description}</p>}
                                <div className="mt-3">
                                    {course.features.map(feature => (
                                        <div key={feature} className="flex items-center my-2.5">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-primary-blue mr-2" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => !course.disabled && openEnrollPopup(course.title)}
                                    disabled={course.disabled}
                                    className={cn("inline-block bg-primary text-black px-5 py-2.5 rounded-lg no-underline font-bold mt-4 w-full transition-all duration-300", 
                                    course.disabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-lg")}>
                                    {course.enrollButton}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </section>
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
                  <a key={link.text} href={link.url} className="flex items-center gap-2.5 text-gray-300 hover:text-white hover:scale-105 transition-all duration-300 text-base">
                    <FontAwesomeIcon icon={link.icon} className="h-5 w-5" style={{color: link.color}}/>
                    <span className="font-medium">{link.text}</span>
                  </a>
                ))}
            </div>
            
            <div className="mt-10 pt-8 border-t border-zinc-800 text-center">
                <p className="text-sm text-zinc-500" dangerouslySetInnerHTML={{ __html: footerData.copyright }} />
            </div>
        </div>
      </footer>
      <style jsx>{`
        .animate-popIn {
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes popIn {
          from {
            transform: scale(0.85);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .text-shadow-lg {
          text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
        }
      `}</style>
    </div>
  );
}
