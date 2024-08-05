import Modal from 'react-modal';
Modal.setAppElement('#root');

import React from 'react';

const EventDetailsModal = ({ event, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-11/12 md:w-2/3 lg:w-1/2">
        <button onClick={closeModal} className="absolute top-2 right-2 text-blue-500">
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
        <p className="text-lg mb-4">{event.description}</p>
        <p className="text-gray-600 mb-4">Date: {event.date}</p>
        <p className="text-gray-600 mb-4">Location: {event.location}</p>
        <img src="https://via.placeholder.com/400" alt="Event" className="rounded-lg shadow-md" />
      </div>
    </div>
  );
};

export default EventDetailsModal;
