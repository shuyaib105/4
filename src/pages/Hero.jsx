import React from 'react';
import { FaLightbulb, FaGlobe, FaRocket } from 'react-icons/fa';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>আপনার জ্ঞানের যাত্রায় আমরা আপনার সাথে আছি</h1>
        <p>বিশেষজ্ঞদের তৈরি করা কোর্সগুলোর মাধ্যমে নতুন দক্ষতা অর্জন করুন</p>
        <div className="hero-features">
          <div className="feature">
            <FaLightbulb className="feature-icon" />
            <h3>বিশেষজ্ঞ প্রশিক্ষণ</h3>
          </div>
          <div className="feature">
            <FaGlobe className="feature-icon" />
            <h3>অনলাইন শেখা</h3>
          </div>
          <div className="feature">
            <FaRocket className="feature-icon" />
            <h3>দ্রুত প্রগতি</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;