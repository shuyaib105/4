import React, { useState, useEffect, useRef } from 'react';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [containerLoaded, setContainerLoaded] = useState(false);
  
  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    // Add loaded class after a short delay to trigger animation
    const timer = setTimeout(() => {
      setContainerLoaded(true);
    }, 100);

    // Cleanup timeout
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Clear error when user starts typing
  const handleInputChange = () => {
    if (error) {
      setError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim()) {
      setError('নাম প্রদান করুন!');
      nameInputRef.current?.focus();
      return;
    }
    
    if (!password.trim()) {
      setError('পাসওয়ার্ড প্রদান করুন!');
      passwordInputRef.current?.focus();
      return;
    }

    setIsLoading(true);

    // Simulate a slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    // Save to local storage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);

    // Check for redirect URL and enrollment parameters
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect') || '/dashboard';
    const enrollCourse = urlParams.get('enroll');

    if (enrollCourse) {
      // Store the course to enroll after login
      localStorage.setItem('pendingEnrollment', enrollCourse);
    }

    // Redirect to the specified page
    window.location.href = redirectUrl;
  };

  return (
    <div className={`login-container ${containerLoaded ? 'loaded' : ''}`} role="main">
      {/* Logo */}
      <div className="logo-box" aria-hidden="true">
        <img
          src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png"
          alt="সিলেবাসের বাইরে লোগো"
          className="logo-img"
        />
      </div>

      <h2>Account Management</h2>

      {/* Warning message */}
      <div className="warning-box" role="alert" aria-live="polite">
        <p>
          <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>{' '}
          <strong>সতর্কবার্তা:</strong> এইটা আপনার লোকাল স্টোরেজে সেভ থাকবে, অন্য ব্রাউজার বা ডিভাইস এ গেলে আপনার একাউন্ট টি থাকবে না।
          <br /> নাম যা দিবেন সেইটাই ব্যাবহার করবেন কেননা রেজাল্ট তৈরিতে সেই নাম টাই ব্যবহার হবে,Dashboard এ গিয়ে নাম এডিট করতে পারবেন।
          পাসওয়ার্ড সংরক্ষণ করুন কেননা আমাদের কোনো ডেটাবেস নেই,তবে রেজাল্ট এর ডেটাবেস থাকবে শুধু।
        </p>
      </div>

      {/* Error message display */}
      {error && (
        <div className="error-msg" role="alert" aria-live="assertive">
          {error}
        </div>
      )}

      {/* Login form */}
      <form id="loginForm" onSubmit={handleLogin} noValidate>
        <div className="input-group">
          <label htmlFor="name">আপনার নাম</label>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            className="input-field"
            placeholder="আপনার নাম লিখুন"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleInputChange();
            }}
            aria-describedby={error ? "login-error" : undefined}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            className="input-field"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange();
            }}
            aria-describedby={error ? "login-error" : undefined}
          />
        </div>

        <button 
          type="submit" 
          className="login-btn" 
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin" aria-hidden="true"></i> LOGIN NOW
            </>
          ) : (
            'LOGIN NOW'
          )}
        </button>
      </form>

      <a href="/" className="back-home">
        <i className="fas fa-arrow-left" aria-hidden="true"></i> হোম পেজে ফিরে যান
      </a>
    </div>
  );
};

export default Login;