import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ActionButtons from '../components/ActionButtons';
import CoursesSection from '../components/CoursesSection';
import Footer from '../components/Footer';
import EnrollModal from '../components/EnrollModal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const openEnrollModal = (courseName) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  const closeEnrollModal = () => {
    setIsModalOpen(false);
  };

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
  );
}

export default Home;