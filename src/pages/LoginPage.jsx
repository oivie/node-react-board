import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://node-react-board-backend.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser({ id: res.data.user.id, name: res.data.user.name, email: res.data.user.email });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className="bg-blue-800 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
