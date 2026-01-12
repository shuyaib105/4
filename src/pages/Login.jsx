import React, { useState, useEffect } from 'react';
import './Login.css';
// Note: Font Awesome icons are loaded via CDN in the original HTML
// Make sure to include the Font Awesome link in your public/index.html file:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [containerLoaded, setContainerLoaded] = useState(false);

  useEffect(() => {
    // Add loaded class after a short delay to trigger animation
    const timer = setTimeout(() => {
      setContainerLoaded(true);
    }, 100);

    // Hide error message when user starts typing
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        setError('');
      });
    });

    // Cleanup event listeners
    return () => {
      clearTimeout(timer);
      inputs.forEach(input => {
        input.removeEventListener('input', () => {
          setError('');
        });
      });
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    // Validation
    if (!name.trim() || !password.trim()) {
      setError('নাম এবং পাসওয়ার্ড প্রদান করুন!');
      setIsLoading(false);
      return;
    }

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
    <div className={`login-container ${containerLoaded ? 'loaded' : ''}`}>
      {/* Logo */}
      <div className="logo-box">
        <img
          src="https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/ei_1766508088751-removebg-preview.png"
          alt="সিলেবাসের বাইরে"
          className="logo-img"
        />
      </div>

      <h2>Account Management</h2>

      {/* Warning message */}
      <div className="warning-box">
        <p>
          <i className="fas fa-exclamation-triangle"></i>{' '}
          <strong>সতর্কবার্তা:</strong> এইটা আপনার লোকাল স্টোরেজে সেভ থাকবে, অন্য ব্রাউজার বা ডিভাইস এ গেলে আপনার একাউন্ট টি থাকবে না।
          <br /> নাম যা দিবেন সেইটাই ব্যাবহার করবেন কেননা রেজাল্ট তৈরিতে সেই নাম টাই ব্যবহার হবে,Dashboard এ গিয়ে নাম এডিট করতে পারবেন।
          পাসওয়ার্ড সংরক্ষণ করুন কেননা আমাদের কোনো ডেটাবেস নেই,তবে রেজাল্ট এর ডেটাবেস থাকবে শুধু।
        </p>
      </div>

      {/* Error message display */}
      {error && <div className="error-msg">{error}</div>}

      {/* Login form */}
      <form id="loginForm" onSubmit={handleLogin}>
        <div className="input-group">
          <label>আপনার নাম</label>
          <input
            type="text"
            id="name"
            className="input-field"
            placeholder="আপনার নাম লিখুন"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            className="input-field"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> LOGIN NOW
            </>
          ) : (
            'LOGIN NOW'
          )}
        </button>
      </form>

      <a href="/" className="back-home">
        <i className="fas fa-arrow-left"></i> হোম পেজে ফিরে যান
      </a>
    </div>
  );
};

export default Login;