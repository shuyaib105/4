import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const EnrollModal = ({ isOpen, onClose, courseName }) => {
  const [iconClass, setIconClass] = useState('')
  const [message, setMessage] = useState('')
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Set icon and message based on login status
    if (isLoggedIn) {
      setIconClass('fas fa-certificate modal-icon icon-gold')
      setMessage("Dashboard-এ কোর্সটি যুক্ত করা হচ্ছে...")
    } else {
      setIconClass('fas fa-user-lock modal-icon icon-blue')
      setMessage("লগইন করার পর এই কোর্সটি অটোমেটিক সিলেক্ট করা হবে।")
    }
  }, [isLoggedIn])

  const handleProceed = () => {
    const encodedCourseName = encodeURIComponent(courseName)

    if (isLoggedIn) {
      // Navigate to dashboard with course
      navigate(`/dashboard?course=${encodedCourseName}`)
    } else {
      // Navigate to login with course
      navigate(`/login?course=${encodedCourseName}`)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" style={{ display: isOpen ? 'flex' : 'none' }} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon-container" id="modalIconBox">
          <i className={iconClass}></i>
        </div>
        <span id="modalCourseTitle" className="modal-title">{courseName}</span>
        <p id="modalMessage" className="modal-desc">{message}</p>
        <button className="modal-action-btn" onClick={handleProceed}>Proceed to Enroll</button>
      </div>
    </div>
  )
}

export default EnrollModal