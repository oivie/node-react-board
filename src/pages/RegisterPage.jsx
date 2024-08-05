import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data.msg === 'User already exists') {
        setError('Email already exists. Please use a different email.');
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    }
  };

  return (
    <div className="bg-blue-800 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full p-2 rounded border border-gray-300" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-2 rounded border border-gray-300" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full p-2 rounded border border-gray-300" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="w-full p-2 rounded border border-gray-300" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
