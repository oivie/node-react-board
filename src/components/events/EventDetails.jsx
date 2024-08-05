import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../../contexts/EventProvider';

const EventDetails = () => {
  const { id } = useParams();
  const { events } = useContext(EventContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = events.find(event => event._id === parseInt(id));
    setEvent(foundEvent);
  }, [id, events]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-dark text-white min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">{event.name}</h1>
        <p className="text-lg mt-4">{event.description}</p>
        <p className="text-gray-400 mt-4">Date: {event.date}</p>
        <p className="text-gray-400">Location: {event.location}</p>
      </div>
    </div>
  );
};

export default EventDetails;
