import React from 'react';
import { FaBook, FaUsers, FaChartLine, FaLaptop, FaChalkboardTeacher } from 'react-icons/fa';
import './ActionButtons.css';

function ActionButtons() {
  return (
    <section className="action-buttons-section">
      <div className="container">
        <h2>আমাদের সার্ভিস সমূহ</h2>
        <div className="action-buttons-grid">
          <button className="action-button">
            <FaBook className="icon" />
            <span>কোর্স সমূহ</span>
          </button>
          <button className="action-button">
            <FaUsers className="icon" />
            <span>কমিউনিটি</span>
          </button>
          <button className="action-button">
            <FaChartLine className="icon" />
            <span>প্রগতি</span>
          </button>
          <button className="action-button">
            <FaLaptop className="icon" />
            <span>অনলাইন শিক্ষা</span>
          </button>
          <button className="action-button">
            <FaChalkboardTeacher className="icon" />
            <span>প্রশিক্ষক</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ActionButtons;