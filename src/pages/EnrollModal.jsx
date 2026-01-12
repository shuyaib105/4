import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './EnrollModal.css';

function EnrollModal({ isOpen, onClose, courseName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>কোর্সে এনরোল করুন</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          <p><strong>কোর্স:</strong> {courseName}</p>
          <p>আপনি কি নিশ্চিত যে আপনি এই কোর্সে এনরোল করতে চান?</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>বাতিল করুন</button>
          <button className="btn btn-primary">এনরোল করুন</button>
        </div>
      </div>
    </div>
  );
}

export default EnrollModal;