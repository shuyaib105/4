import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import ActionButtons from '../components/ActionButtons.jsx'
import CoursesSection from '../components/CoursesSection.jsx'
import Footer from '../components/Footer.jsx'
import EnrollModal from '../components/EnrollModal.jsx'

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('')

  const openEnrollModal = (courseName) => {
    setSelectedCourse(courseName)
    setIsModalOpen(true)
  }

  const closeEnrollModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="App">
      <Header />
      <Hero />
      <ActionButtons />
      <CoursesSection openEnrollModal={openEnrollModal} />
      <Footer />
      <EnrollModal
        isOpen={isModalOpen}
        onClose={closeEnrollModal}
        courseName={selectedCourse}
      />
    </div>
  )
}

export default Home