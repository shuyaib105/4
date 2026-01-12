import React, { useState, useEffect } from 'react';
import { 
  UserCircle, Menu, X, CheckCircle, Info, 
  ShieldCheck, Send, LogOut, LayoutDashboard, LogIn 
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('hsc26');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalData, setModalData] = useState({ isOpen: false, courseName: '' });

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(status);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.reload();
  };

  const openEnrollPopup = (courseName) => {
    setModalData({ isOpen: true, courseName });
  };

  const closeEnrollPopup = () => {
    setModalData({ isOpen: false, courseName: '' });
  };

  const executeRedirect = () => {
    const encodedCourseName = encodeURIComponent(modalData.courseName);
    if (isLoggedIn) {
      window.location.href = `dashboard.html?course=${encodedCourseName}`;
    } else {
      window.location.href = `login.html?course=${encodedCourseName}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#333] selection:bg-[#FFD200]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap');
        body, * { font-family: 'Hind Siliguri', sans-serif; -webkit-tap-highlight-color: transparent; }
        .montserrat { font-family: 'Montserrat', sans-serif; }
        .side-menu-transition { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>

      {modalData.isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[2000] flex justify-center items-center p-4" onClick={closeEnrollPopup}>
          <div className="bg-white p-8 rounded-[30px] w-full max-w-[400px] text-center shadow-2xl scale-100" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-[#fffdf0] rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-100">
              {isLoggedIn ? <div className="text-2xl text-[#B8860B]">🏆</div> : <div className="text-2xl text-[#3498db]">🔒</div>}
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#111]">{modalData.courseName}</h3>
            <p className="text-base text-[#555] mb-8 leading-relaxed">
              {isLoggedIn ? "ড্যাশবোর্ডে কোর্সটি যুক্ত করা হচ্ছে..." : "লগইন করার পর এই কোর্সটি অটোমেটিক সিলেক্ট করা হবে।"}
            </p>
            <button className="bg-black text-white py-3.5 rounded-xl font-bold text-base w-full transition-all hover:bg-[#B8860B]" onClick={executeRedirect}>এগিয়ে যান</button>
          </div>
        </div>
      )}

      <header className="bg-white/95 px-[5%] h-[75px] flex justify-between items-center sticky top-0 z-[1000] shadow-sm backdrop-blur-md">
        <img src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" alt="Logo" className="h-[50px] w-auto cursor-pointer" onClick={() => window.scrollTo(0, 0)} />
        <div className="flex items-center gap-2 sm:gap-4">
          <a href={isLoggedIn ? "dashboard.html" : "login.html"} className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 montserrat uppercase">
            <UserCircle size={18} />
            <span>{isLoggedIn ? "Dashboard" : "Account"}</span>
          </a>
          <button onClick={toggleMenu} className="p-2 text-[#333] hover:bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div className={`fixed top-0 right-0 w-[290px] h-full bg-white z-[1001] shadow-2xl side-menu-transition p-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={toggleMenu} className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
        <nav className="mt-12">
          <ul className="space-y-2">
            <li><a href="#" className="text-lg font-bold hover:text-[#B8860B] block py-3 border-b border-gray-50">হোম</a></li>
            <li><a href="#courses-section" onClick={toggleMenu} className="text-lg font-bold hover:text-[#B8860B] block py-3 border-b border-gray-50">কোর্সসমূহ</a></li>
            <li className="pt-2">
              <a href={isLoggedIn ? "dashboard.html" : "login.html"} className={`text-lg font-bold block py-3 border-b border-gray-50 flex items-center gap-2 ${isLoggedIn ? 'text-[#B8860B]' : 'text-blue-600'}`}>
                {isLoggedIn ? <LayoutDashboard size={20} /> : <LogIn size={20} />} {isLoggedIn ? "ড্যাশবোর্ড" : "লগইন করুন"}
              </a>
            </li>
            {isLoggedIn && (
              <li className="pt-4">
                <button onClick={handleLogout} className="text-lg font-bold text-red-500 flex items-center gap-2 w-full text-left"><LogOut size={20} /> লগ আউট</button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <section className="px-[6%] py-12 md:py-20 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
          তোমার <span className="text-[#B8860B]">সেরা প্রস্তুতির</span> শুরু হোক এখান থেকেই
        </h1>
        <p className="text-lg md:text-xl text-[#555] leading-relaxed max-w-2xl font-medium">সহজ ব্যাখ্যা আর আধুনিক টেকনিকের মাধ্যমে আমরা তোমার সিলেবাসের ভয় দূর করবো ইনশাআল্লাহ্‌।</p>
      </section>

      <div className="px-[5%] mb-12">
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto">
          {[
            { label: 'COURSES', img: 'https://img.freepik.com/free-photo/books-stacked-table_23-2148213871.jpg', link: '#courses-section' },
            { label: 'QB Bank', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop', link: '#' },
            { label: 'Calendar', img: 'https://img.freepik.com/free-photo/customer-service-call-center-contact-us-concept_53876-127638.jpg', link: 'calendar.html' }
          ].map((btn, idx) => (
            <a key={idx} href={btn.link} className="relative aspect-[16/9] md:h-[105px] rounded-xl overflow-hidden shadow-md flex items-center justify-center group active:scale-95 border border-gray-100" style={{ backgroundImage: `url(${btn.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40"></div>
              <span className="relative z-10 text-white font-bold text-[9px] xs:text-[11px] md:text-sm text-center px-1 montserrat tracking-wider uppercase">{btn.label}</span>
            </a>
          ))}
        </div>
      </div>

      <section id="courses-section" className="px-[5%] py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">আমাদের কোর্সসমূহ</h2>
          <div className="w-full max-w-2xl mx-auto bg-gray-100 p-1 rounded-2xl flex mb-12 border border-gray-200">
            {['hsc26', 'hsc25', 'qbcourse'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 md:py-4 text-sm font-bold rounded-xl transition-all montserrat ${activeTab === tab ? 'bg-white text-[#B8860B] shadow-sm' : 'text-gray-500'}`}>
                {tab === 'qbcourse' ? 'QB COURSE' : tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {activeTab === 'hsc26' && (
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:border-[#FFD200]/50 transition-colors">
                <img src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/phy2f.webp" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold">Physics Second Part</h3><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">FREE</span></div>
                  <ul className="space-y-3 mb-6"><li className="flex items-center gap-2 text-gray-600"><CheckCircle size={18} className="text-blue-500" /> অধ্যায় ভিত্তিক MCQ Exam</li></ul>
                  <button onClick={() => openEnrollPopup('Physics Second Part')} className="w-full bg-[#FFD200] hover:bg-black hover:text-white text-black py-3.5 rounded-xl font-bold transition-all">Enroll Now</button>
                </div>
              </div>
            )}
            {/* ... Other Tabs remain same ... */}
          </div>
        </div>
      </section>

      <footer className="bg-[#111] text-white px-[6%] pt-12 pb-6 mt-12 rounded-t-[40px]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-10 mb-6 text-center md:text-left">
          <div><img src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" className="h-12 mb-4 mx-auto md:mx-0" /><p className="text-gray-400 text-sm">সহজ শিক্ষা সবার জন্য। সিলেবাসের বাইরে তোমাদের পাশে।</p></div>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#" className="flex items-center gap-2 bg-white/5 px-5 py-3 rounded-xl"><Send size={18} className="text-[#0088cc]" /> <span className="font-bold text-sm">টেলিগ্রাম</span></a>
          </div>
        </div>
        <p className="text-center text-[10px] text-gray-500 tracking-[3px] uppercase montserrat">&copy; 2025 SYLLABUSER BAIRE</p>
      </footer>
    </div>
  );
};

export default App;

