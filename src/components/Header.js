import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <header>
        <img
          src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png"
          alt="Logo"
          className="logo-img"
        />
        <div className="header-controls">
          <Link
            to={isLoggedIn ? "/dashboard" : "/login"}
            className="auth-btn"
          >
            <i className="fas fa-user-circle"></i>
            <span>{isLoggedIn ? "DASHBOARD" : "Account"}</span>
          </Link>
          <div className="menu-icon" onClick={toggleMenu}>
            <i className="fas fa-bars-staggered"></i>
          </div>
        </div>
      </header>

      <div className={`side-menu ${isMenuOpen ? 'active' : ''}`} id="sideMenu">
        <div className="close-menu" onClick={toggleMenu}>
          <i className="fas fa-times"></i>
        </div>
        <ul>
          <li><a href="#" onClick={toggleMenu}>হোম</a></li>
          <li><a href="#courses-section" onClick={toggleMenu}>কোর্সসমূহ</a></li>
          <li><a href="#" onClick={toggleMenu}>আমাদের সম্পর্কে</a></li>
          {isLoggedIn ? (
            <li><a href="#" onClick={handleLogout} style={{color: '#e74c3c'}}>লগ আউট</a></li>
          ) : (
            <li><a href="/login" onClick={toggleMenu}>লগইন করুন</a></li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Header;