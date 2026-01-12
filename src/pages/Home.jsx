import React, { useState, lazy, Suspense } from 'react';
import { FaStar, FaBook, FaUsers, FaChartLine, FaLaptop, FaChalkboardTeacher } from 'react-icons/fa';

// Lazy load heavy components to improve initial load time
const Header = lazy(() => import('./Header.jsx')); // Updated import path
const Hero = lazy(() => import('./Hero.jsx')); // Updated import path
const ActionButtons = lazy(() => import('./ActionButtons.jsx')); // Updated import path
const CoursesSection = lazy(() => import('./CoursesSection.jsx')); // Updated import path
const Footer = lazy(() => import('./Footer.jsx')); // Updated import path
const EnrollModal = lazy(() => import('./EnrollModal.jsx')); // Updated import path

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

  // Preload images and resources for better performance
  React.useEffect(() => {
    // Add any preload logic here if needed
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div className="loading">Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default Home;