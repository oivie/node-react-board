import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const AdsList = ({ filter }) => {
  const [ads, setAds] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get(`/api/events/user/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAds(res.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    if (user && user.id) {
      fetchAds();
    }
  }, [user, filter]);

  if (!ads.length) {
    return <div>No ads found.</div>;
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAds(ads.filter((ad) => ad._id !== id));
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {ads.map((ad) => (
        <div key={ad._id} className="bg-light-blue-100 text-black p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">{new Date(ad.date).toLocaleDateString()} - {ad.location}</div>
            <button className="text-black border border-black rounded-full px-3 py-1" onClick={() => handleDelete(ad._id)}>Remove</button>
          </div>
          <h3 className="text-xl font-bold mb-2">{ad.title}</h3>
          <p className="mb-4">{ad.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AdsList;
