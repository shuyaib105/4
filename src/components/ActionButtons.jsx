import React from 'react'

const ActionButtons = () => {
  return (
    <div className="action-buttons">
      <a href="#courses-section" className="img-btn" style={{backgroundImage: "url('https://img.freepik.com/free-photo/books-stacked-table_23-2148213871.jpg')"}}>
        <span>COURSES</span>
      </a>
      <a href="#" className="img-btn" style={{backgroundImage: "url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop')"}}>
        <span><center>Question Bank</center></span>
      </a>
      <a href="calender.html" className="img-btn" style={{backgroundImage: "url('https://img.freepik.com/free-photo/customer-service-call-center-contact-us-concept_53876-127638.jpg')"}}>
        <span>Calender</span>
      </a>
    </div>
  )
}

export default ActionButtons