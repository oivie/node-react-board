import React from 'react';

const EventCard = ({ event, onEdit, onRemove }) => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 shadow-md relative">
      <div className="absolute top-2 left-2 text-xs">
        {event.date}
      </div>
      <h3 className="text-xl font-bold mb-2">{event.name}</h3>
      <p className="mb-4">{event.description}</p>
      {event.image && <img src={event.image} alt="Event" className="w-full h-32 object-cover rounded mb-4" />}
      <div className="flex justify-end space-x-2">
        <button onClick={() => onEdit(event)} className="bg-blue-500 text-white rounded-full px-4 py-2">Edit</button>
        <button onClick={() => onRemove(event)} className="bg-red-500 text-white rounded-full px-4 py-2">Remove</button>
      </div>
    </div>
  );
};

export default EventCard;
