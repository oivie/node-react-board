import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { EventContext } from '../../contexts/EventProvider';

const CreateEditEventModal = ({ isOpen, onRequestClose, event }) => {
  const { addEvent, updateEvent } = useContext(EventContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date.substring(0, 10)); // Extract the date part only
      setLocation(event.location);
      setTags(event.tags ? event.tags.join(', ') : '');
    } else {
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setTags('');
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { title, description, date, location, tags: tags.split(',').map(tag => tag.trim()) };
    try {
      const token = localStorage.getItem('token');
      let res;
      if (event) {
        // Update existing event
        res = await axios.put(`https://node-react-board-backend.onrender.com/api/events/${event._id}`, newEvent, {
          headers: { Authorization: `Bearer ${token}` },
        });
        updateEvent(res.data);
      } else {
        // Create new event
        res = await axios.post('https://node-react-board-backend.onrender.com/api/events', newEvent, {
          headers: { Authorization: `Bearer ${token}` },
        });
        addEvent(res.data);
      }
      onRequestClose();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create/Edit Event"
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-blue-800 bg-opacity-100"
      style={{
        content: {
          width: '80%',
          maxWidth: '600px',
          height: 'auto',
          overflow: 'auto',
        },
      }}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-full relative">
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 bg-dark-blue-800 text-white rounded-full px-3 py-1"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{event ? 'Edit Event' : 'Create Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Event Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tags (comma separated)</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onRequestClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateEditEventModal;
