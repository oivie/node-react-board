import React, { useEffect, useState, useContext } from 'react';
import CreateEditEventModal from './CreateEditEventModal';
import FilterTags from '../filter/FilterTags';
import { UserContext } from '../../contexts/UserContext';
import { EventContext } from '../../contexts/EventProvider';
import axios from 'axios';

const EventsBoard = ({ openModal }) => {
  const { events, addEvent, updateEvent } = useContext(EventContext);
  const { user } = useContext(UserContext);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState(['All', 'Web Dev', 'Data Analytics', 'Machine Learning', 'Android Dev', 'iOS Dev', 'General']);
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    setFilteredEvents(events);

    const uniqueTags = new Set();
    events.forEach(event => {
      if (event.tags) {
        event.tags.forEach(tag => uniqueTags.add(tag));
      }
    });
    setTags(['All', ...Array.from(uniqueTags)]);
  }, [events]);

  const handleEdit = (event) => {
    if (user && event.createdBy._id !== user.id) {
      alert('Sorry, you did not create this event.');
      return;
    }
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Update the local state immediately after successful deletion
      setFilteredEvents(prevEvents => prevEvents.filter((event) => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  

  const handleSave = (savedEvent) => {
    if (selectedEvent) {
      updateEvent(savedEvent);
      // Update the local state immediately after successful edit
      setFilteredEvents(prevEvents => prevEvents.map(event => event._id === savedEvent._id ? savedEvent : event));
    } else {
      addEvent(savedEvent);
      // Ensure that the new event is added to the filtered events immediately
      setFilteredEvents(prevEvents => [...prevEvents, savedEvent]);
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  
  

  const handleFilter = (tag) => {
    setSelectedTag(tag);
    if (tag === 'All') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.tags.includes(tag)));
    }
  };

  const now = new Date();

  const categorizeEvents = (events) => {
    const thisWeekEvents = [];
    const upcomingEvents = [];
    const pastEvents = [];

    events.forEach(event => {
      const eventDate = new Date(event.date);
      const diffDays = (eventDate - now) / (1000 * 60 * 60 * 24);

      if (diffDays < 0) {
        pastEvents.push(event);
      } else if (diffDays <= 7) {
        thisWeekEvents.push(event);
      } else {
        upcomingEvents.push(event);
      }
    });

    return { thisWeekEvents, upcomingEvents, pastEvents };
  };

  const { thisWeekEvents, upcomingEvents, pastEvents } = categorizeEvents(filteredEvents);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Filter by Tags</h2>
      <FilterTags onFilter={handleFilter} tags={tags} />

      {user && (
        <button onClick={openModal} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-full">
          Create Event
        </button>
      )}

      <h2 className="text-3xl font-bold mt-12 mb-6">This Week's Events</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {thisWeekEvents.map((event) => (
          <div key={event._id} className="bg-light-blue-200 text-black p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-700">{new Date(event.date).toLocaleDateString()} - {event.location}</div>
              <div className="text-sm text-gray-700">Created by: {event.createdBy.name}</div>
              {user && event.createdBy._id === user.id && (
                <div className="flex flex-col sm:flex-row">
                  <button className="text-black border border-black rounded-full px-3 py-1 mr-2 mb-2 sm:mb-0 w-full sm:w-auto" onClick={() => handleEdit(event)}>Edit</button>
                  <button className="text-black border border-black rounded-full px-3 py-1 w-full sm:w-auto" onClick={() => handleDelete(event._id)}>Remove</button>
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="mb-4">{event.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Upcoming Events</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {upcomingEvents.map((event) => (
          <div key={event._id} className="bg-light-blue-300 text-black p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-700">{new Date(event.date).toLocaleDateString()} - {event.location}</div>
              <div className="text-sm text-gray-700">Created by: {event.createdBy.name}</div>
              {user && event.createdBy._id === user.id && (
                <div className="flex flex-col sm:flex-row">
                  <button className="text-black border border-black rounded-full px-3 py-1 mr-2 mb-2 sm:mb-0 w-full sm:w-auto" onClick={() => handleEdit(event)}>Edit</button>
                  <button className="text-black border border-black rounded-full px-3 py-1 w-full sm:w-auto" onClick={() => handleDelete(event._id)}>Remove</button>
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="mb-4">{event.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Past Events</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {pastEvents.map((event) => (
          <div key={event._id} className="bg-light-blue-100 text-black p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-700">{new Date(event.date).toLocaleDateString()} - {event.location}</div>
              <div className="text-sm text-gray-700">Created by: {event.createdBy.name}</div>
              {user && event.createdBy._id === user.id && (
                <div className="flex flex-col sm:flex-row">
                  <button className="text-black border border-black rounded-full px-3 py-1 mr-2 mb-2 sm:mb-0 w-full sm:w-auto" onClick={() => handleEdit(event)}>Edit</button>
                  <button className="text-black border border-black rounded-full px-3 py-1 w-full sm:w-auto" onClick={() => handleDelete(event._id)}>Remove</button>
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="mb-4">{event.description}</p>
          </div>
        ))}
      </div>
      
      <CreateEditEventModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        event={selectedEvent}
      />
    </div>
  );
};

export default EventsBoard;
