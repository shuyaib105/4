import React from 'react';
import { FaGraduationCap, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <FaGraduationCap className="logo-icon" />
          <span>এডুকেশন প্লাটফর্ম</span>
        </Link>
        
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link">হোম</Link>
          <Link to="/courses" className="nav-link">কোর্স</Link>
          <Link to="/about" className="nav-link">সম্পর্কে</Link>
          <Link to="/contact" className="nav-link">যোগাযোগ</Link>
          <Link to="/login" className="nav-link login-btn">লগইন</Link>
        </nav>
        
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}

export default Header;