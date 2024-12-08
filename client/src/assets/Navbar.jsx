import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaBriefcase, 
  FaClipboardList, 
  FaUser, 
  FaBell, 
  FaRobot,
  FaFileAlt,
  FaSignOutAlt 
} from 'react-icons/fa';

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navItems = [
    { path: '/home', icon: <FaHome size={20} />, text: 'Home' },
    { path: '/jobs', icon: <FaBriefcase size={20} />, text: 'Jobs' },
    { path: '/applications', icon: <FaClipboardList size={20} />, text: 'Applications' },
    { path: '/resumes', icon: <FaFileAlt size={20} />, text: 'Resumes' },
    { path: '/profile', icon: <FaUser size={20} />, text: 'Profile' },
    { path: '/notifications', icon: <FaBell size={20} />, text: 'Notifications' },
    { path: '/chatbot', icon: <FaRobot size={20} />, text: 'Chatbot' },
  ];

  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top custom-navbar">
      <div className="container">
        <Link to="/home" className="navbar-brand">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="brand-text"
          >
            JobSync
          </motion.span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="d-flex align-items-center"
                  >
                    {item.icon}
                    <span className="ms-2">{item.text}</span>
                  </motion.div>
                </Link>
              </li>
            ))}
            <li className="nav-item ms-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="btn btn-danger d-flex align-items-center"
              >
                <FaSignOutAlt />
                <span className="ms-2">Logout</span>
              </motion.button>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .custom-navbar {
          background: white;
          padding: 0.8rem 0;
        }

        .brand-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(45deg, #2196F3, #00BCD4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-link {
          color: #333;
          padding: 0.5rem 1rem !important;
          margin: 0 0.2rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          background: rgba(33, 150, 243, 0.1);
          color: #2196F3;
        }

        .nav-link.active {
          background: rgba(33, 150, 243, 0.15);
          color: #2196F3;
          font-weight: 500;
        }

        .btn-danger {
          background: linear-gradient(45deg, #FF5252, #FF1744);
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
        }

        .btn-danger:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 23, 68, 0.3);
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            padding: 1rem 0;
          }
          
          .nav-item {
            margin: 0.3rem 0;
          }
          
          .nav-link {
            padding: 0.8rem 1rem !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
