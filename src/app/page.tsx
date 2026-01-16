'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBarsStaggered, faTimes, faCertificate, faUserLock, faCheckCircle, faInfoCircle, faShieldAlt, faBookOpen, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useFirebaseApp } from '@/firebase';
import { useRouter } from 'next/navigation';

const heroData = {
  title: 'তোমার <span class="text-accent">সেরা প্রস্তুতির</span> শুরু হোক এখানে থেকেই',
  subtitle: 'সহজ ব্যাখ্যা আর আধুনিক টেকনিকের মাধ্যমে আমরা তোমার সিলেবাসের ভয় দূর করবো ইনশাআল্লাহ্‌।'
};

const actionButtonsData = [
  { url: "#courses-section", title: "কোর্স সমূহ", icon: faBookOpen },
  { url: "#", title: "ক্যালেন্ডার", icon: faCalendarAlt }
];

const courseTabsData = [
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
      }
    ]
  },
  {
    "name": "QB course",
    "id": "qb-course",
    "courses": [
      {
        "title": "HSC প্রশ্নব্যাংক সলভ",
        "price": "৳700",
        "description": "এইচএসসি পরীক্ষার জন্য বিগত বছরের প্রশ্নব্যাংক সলভ ও বিশ্লেষণ।",
        "features": ["বিগত বছরের প্রশ্ন সমাধান", "অধ্যায়ভিত্তিক আলোচনা", "বিশেষ মডেল টেস্ট"],
        "enrollButton": "Enroll Now",
        "image": "https://picsum.photos/seed/hscqb/400/180",
        "imageHint": "question bank",
        "disabled": false,
      }
    ]
  }
];


const footerData = {
  logo: "https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png",
  links: [
    { "url": "https://t.me/syllabuserbaire", "icon": faTelegramPlane, "text": "টেলিগ্রাম চ্যানেল", "color": "#0088cc" },
    { "url": "/about", "icon": faInfoCircle, "text": "আমাদের সম্পর্কে", "color": "hsl(var(--primary-blue))" },
    { "url": "/privacy-policy", "icon": faShieldAlt, "text": "প্রাইভেসি পলিসি", "color": "hsl(var(--success-green))" }
  ],
  copyright: "&copy; 2025 SYLLABUSER BAIRE"
};


export default function Home() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(courseTabsData[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState('');
  
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    await signOut(auth);
    toggleMenu();
  };
  
  const openEnrollPopup = (courseName: string) => {
    setModalCourse(courseName);
    setModalOpen(true);
  };
  
  const executeRedirect = () => {
    const encodedCourseName = encodeURIComponent(modalCourse);
    if (user) {
        router.push(`/dashboard?course=${encodedCourseName}`);
    } else {
        router.push(`/login?course=${encodedCourseName}`);
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* Enroll Popup Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[2000]" onClick={() => setModalOpen(false)}>
          <div className="bg-white p-8 rounded-3xl w-[90%] max-w-md text-center shadow-2xl animate-popIn border-2 border-gray-100" onClick={(e) => e.stopPropagation()}>
            <div className="w-24 h-24 bg-[#fffdf0] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
              <FontAwesomeIcon icon={user ? faCertificate : faUserLock} className={cn("text-5xl", user ? "text-accent" : "text-primary-blue")} />
            </div>
            <span className="font-extrabold text-xl block mb-3 text-gray-800 tracking-tight">{modalCourse}</span>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {user ? "ড্যাশবোর্ডে কোর্সটি যুক্ত করা হচ্ছে..." : "লগইন করার পর এই কোর্সটি অটোমেটিক সিলেক্ট করা হবে।"}
            </p>
            <button onClick={executeRedirect} className="bg-black text-white p-4 rounded-xl font-extrabold text-base w-full uppercase transition-all duration-300 hover:bg-accent hover:-translate-y-0.5 shadow-lg">
              Proceed to Enroll
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/95 px-[6%] py-1 flex justify-between items-center sticky top-0 z-[1000] shadow-sm h-[70px]">
        <Link href="/">
          <Image src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" width={55} height={55} quality={100} className="h-[55px] w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <Link href={user ? "/dashboard" : "/login"} className="no-underline bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 uppercase">
            <FontAwesomeIcon icon={faUserCircle} />
            <span>{user ? "Dashboard" : "Account"}</span>
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
          <li className="mb-5"><a href="#courses-section" onClick={toggleMenu} className="no-underline text-foreground text-lg font-semibold">কোর্সসমূহ</a></li>
          <li className="mb-5"><Link href="/about" onClick={toggleMenu} className="no-underline text-foreground text-lg font-semibold">আমাদের সম্পর্কে</Link></li>
          <li className="mb-5"><Link href={user ? "/dashboard" : "/login"} onClick={toggleMenu} className="no-underline text-foreground text-lg font-semibold">{user ? "ড্যাশবোর্ড" : "লগইন করুন"}</Link></li>
          {user && (
            <li><button onClick={handleLogout} className="no-underline text-red-500 text-lg font-semibold w-full text-left bg-transparent border-none">লগ আউট</button></li>
          )}
        </ul>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-yellow-50 to-background">
          <div className="container mx-auto px-6 py-20 lg:py-28">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: heroData.title }} />
                <p className="text-xl mb-10 text-gray-600 leading-relaxed">{heroData.subtitle}</p>
                <div className="flex flex-wrap gap-4">
                  {actionButtonsData.map(button => (
                      <a key={button.title} href={button.url} className="bg-white rounded-2xl flex items-center justify-center no-underline shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl px-8 py-5">
                          <div className="flex items-center gap-3">
                              <FontAwesomeIcon icon={button.icon} className="text-2xl text-accent" />
                              <span className="text-lg font-bold text-gray-800">{button.title}</span>
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
            
            <div className="flex flex-wrap justify-center gap-4 my-10">
                {footerData.links.map(link => (
                  <Link key={link.text} href={link.url} className="bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-medium py-3 px-5 rounded-full flex items-center gap-3 transition-colors duration-300 text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <FontAwesomeIcon icon={link.icon} className="h-5 w-5" style={{color: link.color}}/>
                    <span>{link.text}</span>
                  </Link>
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
      `}</style>
    </div>
  );
}
