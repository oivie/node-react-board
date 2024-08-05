import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Navbar = ({ openModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleCreateEvent = () => {
    if (user) {
      openModal();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-gray-200 py-2 px-8 relative z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-dark-blue-800 font-bold text-lg cursor-pointer" onClick={() => navigate('/')}>
          EventPlus
        </div>
        <button
          className="md:hidden text-dark-blue-800"
          onClick={handleMobileMenuToggle}
        >
          ☰
        </button>
        <nav className="hidden md:flex bg-white p-2 rounded-full shadow-md items-center justify-between w-full mx-4 my-2 md:my-4 md:mx-8">
          <div className="flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'bg-blue-100 text-dark-blue-800 rounded-full px-3 py-2'
                  : 'text-dark-blue-800 px-3 py-2 rounded-full hover:bg-blue-100'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'bg-blue-100 text-dark-blue-800 rounded-full px-3 py-2'
                  : 'text-dark-blue-800 px-3 py-2 rounded-full hover:bg-blue-100'
              }
            >
              Dashboard
            </NavLink>
            <button
              onClick={handleCreateEvent}
              className="text-dark-blue-800 px-3 py-2 rounded-full hover:bg-blue-100"
            >
              Create Event
            </button>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="mr-4">Welcome, {user.name}!</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-700">Logout</button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-blue-100 text-dark-blue-800 rounded-full px-3 py-2'
                      : 'text-dark-blue-800 px-3 py-2 rounded-full hover:bg-blue-100'
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-blue-100 text-dark-blue-800 rounded-full px-3 py-2'
                      : 'text-dark-blue-800 px-3 py-2 rounded-full hover:bg-blue-100'
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden z-40">
            <nav className="flex flex-col items-start p-4 space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-blue-100 text-dark-blue-800 rounded-full px-3 py-2 w-full text-left'
                    : 'text-dark-blue-800 px-3 py-2 rounded-full hover:bg-blue-100 w-full text-left'
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? 'bg-blue-100 text-dark-blue-800 rounded-full px-3 py-2 w-full text-left'
                    : 'text-dark-blue-800 px-3 py-2 rounded-full hover:bg-blue-100 w-full text-left'
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleCreateEvent();
                }}
                className="text-dark-blue-800 px-3 py-2 rounded-full hover:bg-blue-100 w-full text-left"
              >
                Create Event
              </button>
              {user ? (
                <>
                  <span className="text-dark-blue-800 px-3 py-2 rounded-full w-full text-left">Welcome, {user.name}</span>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-700 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-blue-100 text-dark-blue-800 rounded-full px-3 py-2 w-full text-left'
                        : 'text-dark-blue-800 px-3 py-2 rounded-full hover:bg-blue-100 w-full text-left'
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-blue-100 text-dark-blue-800 rounded-full px-3 py-2 w-full text-left'
                        : 'text-dark-blue-800 px-3 py-2 rounded-full hover:bg-blue-100 w-full text-left'
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
