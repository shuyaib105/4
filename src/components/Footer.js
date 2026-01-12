import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div>
          <img 
            src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png" 
            className="footer-logo-img" 
            alt="Logo"
          />
          <div style={{fontSize: "18px", color: "var(--accent-yellow)", fontWeight: "700", fontFamily: "'Tiro Bangla'"}}></div>
        </div>
        <div className="footer-links">
          <a href="https://t.me/syllabuserbaire">
            <i className="fab fa-telegram-plane" style={{color: "#0088cc"}}></i> টেলিগ্রাম চ্যানেল
          </a>
          <a href="about.html">
            <i className="fas fa-info-circle" style={{color: "var(--primary-blue)"}}></i> আমাদের সম্পর্কে
          </a>
          <a href="privacy.html">
            <i className="fa-solid fa-shield-alt" style={{color: "var(--success-green)"}}></i> প্রাইভেসি পলিসি
          </a>
        </div>
      </div>
      <div className="footer-bottom">&copy; 2025 SYLLABUSER BAIRE </div>
    </footer>
  );
};

export default Footer;