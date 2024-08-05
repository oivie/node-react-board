import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import FilterSidebar from '../components/filter/FilterSidebar';
import AdsList from '../components/ads/AdsList';
import { UserContext } from '../../src/contexts/UserContext';
import ProfileForm from '../components/common/ProfileForm';

const DashboardPage = () => {
  const [filter, setFilter] = useState('created');
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchEvents = async () => {
        try {
          const response = await axios.get(`https://node-react-board-backend.onrender.com/api/events/user/${user.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };

      fetchEvents();
    }
  }, [user]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Please log in to use the dashboard</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="mb-4">
        {user && <h2 className="text-xl">Welcome {user.name}!</h2>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FilterSidebar onFilterChange={handleFilterChange} />
        <div className="col-span-3">
          {filter === 'created' && (
            <AdsList
              filter={filter}
              events={events}
              onDelete={handleDelete}
            />
          )}
          {filter === 'profile' && <ProfileForm />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
