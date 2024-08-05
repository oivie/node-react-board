import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Manages the state and actions related to events.
export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://node-react-board-backend.onrender.com/api/events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = (event) => {
    setEvents((prevEvents) => [event, ...prevEvents]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
    );
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
