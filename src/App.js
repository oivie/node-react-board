import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/common/Footer';
import EventForm from './components/events/EventForm';
import EventDetails from './components/events/EventDetails';
import EventProvider from './contexts/EventProvider';
import { UserProvider, UserContext } from './contexts/UserContext'; // Correct import
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateEditEventModal from './components/events/CreateEditEventModal';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AppContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile');
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      fetchUserProfile();
    }
  }, [setUser]);

  return (
    <div className="relative min-h-screen bg-light-gray">
      <Navbar openModal={openModal} />
      <Routes>
        <Route path="/" element={<HomePage openModal={openModal} />} />
        <Route path="/create" element={<EventForm />} />
        <Route path="/edit/:id" element={<EventForm />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage openModal={openModal} />} />
      </Routes>
      <Footer />
      <CreateEditEventModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <EventProvider>
        <Router>
          <AppContent />
        </Router>
      </EventProvider>
    </UserProvider>
  );
};

export default App;
