import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './CoursesSection.css';

const CoursesSection = ({ openEnrollModal }) => {
  const [activeTab, setActiveTab] = useState('hsc26');
  const { setSelectedCourse } = useAuth();

  const coursesData = {
    hsc26: [
      {
        id: 1,
        title: "Physics Second Part",
        price: "FREE",
        image: "https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/phy2f.webp",
        features: [
          "১০ টি অধ্যায় ভিত্তিক MCQ Exam",
          "১টি সাবজেক্ট ফাইনাল এক্সাম",
          "কোর্স শেষে CQ সাজেশন পিডিএফ ফাইল প্রদান"
        ],
        expired: false
      }
    ],
    hsc25: [
      {
        id: 2,
        title: "Season Over",
        price: "EXPIRED",
        image: "https://raw.githubusercontent.com/shuyaib105/syllabuserbaire/refs/heads/main/phy2f.webp",
        features: [
          "পুরনো কনটেন্ট",
          "পরবর্তী সিজনে আপডেট করা হবে"
        ],
        expired: true
      }
    ],
    qbcourse: [
      {
        id: 3,
        title: "Question Bank Mastery",
        price: "FREE",
        image: "https://img.freepik.com/free-photo/assortment-school-supplies-with-copy-space_23-2148756537.jpg",
        features: [
          "বিগত সালের প্রশ্নের সমাধান",
          "প্রতিদিনের অনুশীলনী প্রশ্ন"
        ],
        expired: false
      }
    ]
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleEnrollClick = (courseName) => {
    if (openEnrollModal) {
      setSelectedCourse(courseName);
      openEnrollModal(courseName);
    }
  };

  return (
    <section id="courses-section">
      <div className="tab-box">
        <button
          className={`tab-btn ${activeTab === 'hsc26' ? 'active' : ''}`}
          onClick={() => handleTabChange('hsc26')}
        >
          HSC 26
        </button>
        <button
          className={`tab-btn ${activeTab === 'hsc25' ? 'active' : ''}`}
          onClick={() => handleTabChange('hsc25')}
        >
          HSC 25
        </button>
        <button
          className={`tab-btn ${activeTab === 'qbcourse' ? 'active' : ''}`}
          onClick={() => handleTabChange('qbcourse')}
        >
          QB Course
        </button>
      </div>

      <div id="hsc26" className={`tab-content ${activeTab === 'hsc26' ? 'active' : ''}`}>
        {coursesData.hsc26.map(course => (
          <div className="course-card" key={course.id}>
            <img src={course.image} className="course-thumb" alt={course.title} />
            <div className="course-info">
              <h3>
                {course.title}
                <span className={course.expired ? "expired-tag" : "price-tag"}>
                  {course.price}
                </span>
              </h3>

              {course.features.map((feature, index) => (
                <div key={index} style={{display: "flex", alignItems: "center", margin: "10px 0", transition: "all 0.3s ease;"}}>
                  <i className="fas fa-check-circle" style={{color: course.expired ? "#999" : "var(--primary-blue)", marginRight: "8px", transition: "all 0.3s ease;"}}></i>
                  <span style={{color: course.expired ? "#999" : "inherit"}}>{feature}</span>
                </div>
              ))}

              <button
                className={`enroll-btn ${course.expired ? 'disabled' : ''}`}
                onClick={() => handleEnrollClick(course.title)}
                disabled={course.expired}
              >
                {course.expired ? 'Registration Closed' : 'Enroll Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div id="hsc25" className={`tab-content ${activeTab === 'hsc25' ? 'active' : ''}`}>
        {coursesData.hsc25.map(course => (
          <div className="course-card" key={course.id}>
            <img src={course.image} className="course-thumb" alt={course.title} />
            <div className="course-info">
              <h3>
                {course.title}
                <span className={course.expired ? "expired-tag" : "price-tag"}>
                  {course.price}
                </span>
              </h3>
              <p>HSC 25 এর জন্য সিজন শেষ! পরবর্তী সিজনে আবার যোগ দিন।</p>

              {course.features.map((feature, index) => (
                <div key={index} style={{display: "flex", alignItems: "center", margin: "10px 0", color: "#999", transition: "all 0.3s ease;"}}>
                  <i className="fas fa-check-circle" style={{color: "#999", marginRight: "8px", transition: "all 0.3s ease;"}}></i>
                  <span>{feature}</span>
                </div>
              ))}

              <button className="enroll-btn disabled" disabled>Registration Closed</button>
            </div>
          </div>
        ))}
      </div>

      <div id="qbcourse" className={`tab-content ${activeTab === 'qbcourse' ? 'active' : ''}`}>
        {coursesData.qbcourse.map(course => (
          <div className="course-card" key={course.id}>
            <img src={course.image} className="course-thumb" alt={course.title} />
            <div className="course-info">
              <h3>
                {course.title}
                <span className={course.expired ? "expired-tag" : "price-tag"}>
                  {course.price}
                </span>
              </h3>
              <p>প্রশ্ন ব্যাংকের সম্পূর্ণ সমাধান। বোর্ড ও ভর্তি পরীক্ষার জন্য অত্যন্ত গুরুত্বপূর্ণ।</p>

              {course.features.map((feature, index) => (
                <div key={index} style={{display: "flex", alignItems: "center", margin: "10px 0", transition: "all 0.3s ease;"}}>
                  <i className="fas fa-check-circle" style={{color: course.expired ? "#999" : "var(--primary-blue)", marginRight: "8px", transition: "all 0.3s ease;"}}></i>
                  <span style={{color: course.expired ? "#999" : "inherit"}}>{feature}</span>
                </div>
              ))}

              <button
                className={`enroll-btn ${course.expired ? 'disabled' : ''}`}
                onClick={() => handleEnrollClick(course.title)}
                disabled={course.expired}
              >
                {course.expired ? 'Registration Closed' : 'Enroll Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesSection;