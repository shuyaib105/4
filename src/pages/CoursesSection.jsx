import React from 'react';
import { FaBook, FaChalkboardTeacher, FaClock, FaStar } from 'react-icons/fa';
import './CoursesSection.css';

function CoursesSection({ openEnrollModal }) {
  const courses = [
    {
      id: 1,
      title: "ওয়েব ডেভেলপমেন্ট",
      instructor: "জন ডো",
      duration: "12 সপ্তাহ",
      rating: 4.8,
      students: 1200
    },
    {
      id: 2,
      title: "মোবাইল অ্যাপ ডেভেলপমেন্ট",
      instructor: "জেন ডো",
      duration: "10 সপ্তাহ",
      rating: 4.7,
      students: 950
    },
    {
      id: 3,
      title: "গ্রাফিক্স ডিজাইন",
      instructor: "রবিন হুড",
      duration: "8 সপ্তাহ",
      rating: 4.9,
      students: 800
    }
  ];

  return (
    <section className="courses-section">
      <div className="container">
        <h2>জনপ্রিয় কোর্স সমূহ</h2>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <FaBook className="course-icon" />
                <h3>{course.title}</h3>
              </div>
              <div className="course-details">
                <div className="detail-item">
                  <FaChalkboardTeacher /> <span>{course.instructor}</span>
                </div>
                <div className="detail-item">
                  <FaClock /> <span>{course.duration}</span>
                </div>
                <div className="detail-item">
                  <FaStar /> <span>{course.rating} ({course.students} শিক্ষার্থী)</span>
                </div>
              </div>
              <button 
                className="enroll-btn" 
                onClick={() => openEnrollModal(course.title)}
              >
                এনরোল করুন
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;