import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>এডুকেশন প্লাটফর্ম</h3>
            <p>আপনার জ্ঞানের যাত্রায় আমরা আপনার সাথে আছি</p>
          </div>
          
          <div className="footer-section">
            <h4>লিংক সমূহ</h4>
            <ul>
              <li><a href="/">হোম</a></li>
              <li><a href="/courses">কোর্স সমূহ</a></li>
              <li><a href="/about">সম্পর্কে</a></li>
              <li><a href="/contact">যোগাযোগ</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>যোগাযোগ</h4>
            <p>ঢাকা, বাংলাদেশ</p>
            <p>info@example.com</p>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} এডুকেশন প্লাটফর্ম। সকল অধিকার সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;