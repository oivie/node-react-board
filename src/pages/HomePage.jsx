import React, { useState, useContext } from 'react';
import LandingSection from '../components/common/LandingSection';
import EventsBoard from '../components/events/EventsBoard';
import StatisticsSection from '../components/StatisticsSection';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ openModal }) => {
  const [filter, setFilter] = useState('All');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFilter = (tag) => {
    setFilter(tag);
  };

  const handleCreateEvent = () => {
    if (user) {
      openModal();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-light-gray">
      <LandingSection />
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <EventsBoard filter={filter} openModal={handleCreateEvent} />
        </div>
      </div>
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <StatisticsSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
