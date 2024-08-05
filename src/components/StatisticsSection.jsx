import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatisticsSection = () => {
  const [statistics, setStatistics] = useState({
    userCount: 0,
    eventCount: 0,
    topUsers: [],
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/statistics/stats');
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6">
            <h3 className="text-4xl font-bold text-dark-blue-800">{statistics.eventCount}</h3>
            <p className="text-gray-500">Events Created</p>
          </div>
          <div className="p-6">
            <h3 className="text-4xl font-bold text-dark-blue-800">{statistics.userCount}</h3>
            <p className="text-gray-500">Users Registered</p>
          </div>
          <div className="p-6">
            <h3 className="text-4xl font-bold text-dark-blue-800">Top Users</h3>
            <ul className="text-gray-500">
              {statistics.topUsers.map((user, index) => (
                <li key={index} className="flex items-center justify-center space-x-2">
                  <span>{user.name}</span>
                  <span>({user.eventCount} events)</span>
                  <span>🎉</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
