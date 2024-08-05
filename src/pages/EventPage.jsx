import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventDetails } from '../redux/actions/eventActions';

const EventPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector(state => state.event);
  const { eventDetails } = event;

  useEffect(() => {
    dispatch(getEventDetails(id));
  }, [dispatch, id]);

  return (
    <div className="bg-dark text-white min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold">{eventDetails.name}</h1>
        <p className="text-gray-400 mt-4">{eventDetails.description}</p>
        <p className="text-gray-400 mt-4">Date: {new Date(eventDetails.date).toLocaleDateString()}</p>
        <p className="text-gray-400 mt-4">Location: {eventDetails.location}</p>
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Attendees</h2>
          <ul className="mt-4">
            {eventDetails.attendees.map(attendee => (
              <li key={attendee.id} className="text-gray-400">{attendee.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <button className="bg-green-500 text-white px-4 py-2 rounded mr-4">RSVP</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Cancel RSVP</button>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
