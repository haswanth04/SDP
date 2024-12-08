import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaBriefcase, FaCheckCircle, FaClock, FaEnvelope, FaExclamationCircle } from 'react-icons/fa';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const userName = localStorage.getItem('userName');

  // Dummy notifications data - In real app, this would come from an API
  useEffect(() => {
    const dummyNotifications = [
      {
        id: 1,
        type: 'application',
        title: 'Application Reviewed',
        message: 'Your application for Senior Software Developer at Tech Solutions Inc. has been reviewed.',
        status: 'unread',
        timestamp: '2 hours ago',
        priority: 'high',
        action: 'View Application'
      },
      {
        id: 2,
        type: 'interview',
        title: 'Interview Scheduled',
        message: 'You have an upcoming interview with Digital Innovations Co. on March 25, 2024.',
        status: 'unread',
        timestamp: '5 hours ago',
        priority: 'high',
        action: 'Prepare Now'
      },
      {
        id: 3,
        type: 'job-match',
        title: 'New Job Match',
        message: 'We found a new job matching your profile: Full Stack Developer at Innovation Labs.',
        status: 'read',
        timestamp: '1 day ago',
        priority: 'medium',
        action: 'View Job'
      },
      {
        id: 4,
        type: 'profile',
        title: 'Profile Update Reminder',
        message: 'Keep your profile updated to get better job matches.',
        status: 'read',
        timestamp: '2 days ago',
        priority: 'low',
        action: 'Update Profile'
      }
    ];
    setNotifications(dummyNotifications);
  }, []);

  // Updated color scheme for notification types
  const getTypeStyles = (type) => {
    switch (type) {
      case 'application':
        return {
          icon: <FaBriefcase size={20} />,
          background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
          color: '#1976D2'
        };
      case 'interview':
        return {
          icon: <FaClock size={20} />,
          background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
          color: '#388E3C'
        };
      case 'job-match':
        return {
          icon: <FaCheckCircle size={20} />,
          background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
          color: '#7B1FA2'
        };
      case 'profile':
        return {
          icon: <FaExclamationCircle size={20} />,
          background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
          color: '#F57C00'
        };
      default:
        return {
          icon: <FaBell size={20} />,
          background: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
          color: '#616161'
        };
    }
  };

  // Updated priority styles
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return {
          border: '1px solid rgba(244, 67, 54, 0.1)',
          background: 'linear-gradient(to right, rgba(244, 67, 54, 0.1), transparent)',
          shadow: '0 4px 20px rgba(244, 67, 54, 0.1)'
        };
      case 'medium':
        return {
          border: '1px solid rgba(255, 152, 0, 0.1)',
          background: 'linear-gradient(to right, rgba(255, 152, 0, 0.1), transparent)',
          shadow: '0 4px 20px rgba(255, 152, 0, 0.1)'
        };
      case 'low':
        return {
          border: '1px solid rgba(33, 150, 243, 0.1)',
          background: 'linear-gradient(to right, rgba(33, 150, 243, 0.1), transparent)',
          shadow: '0 4px 20px rgba(33, 150, 243, 0.1)'
        };
      default:
        return {
          border: '1px solid rgba(0, 0, 0, 0.1)',
          background: 'white',
          shadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
        };
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, status: 'read' } : notif
    ));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return notif.status === 'unread';
    if (filter === 'read') return notif.status === 'read';
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mt-4"
      style={{ maxWidth: '900px' }}
    >
      {/* Header Section */}
      <motion.div
        className="card mb-4"
        style={{
          background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
          border: 'none',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="mb-3 mb-md-0">
              <h2 className="mb-1 d-flex align-items-center" style={{ color: '#2196F3' }}>
                <FaBell className="me-2" />
                Notifications
              </h2>
              <p className="text-muted mb-0" style={{ fontSize: '1.1rem' }}>
                Welcome back, {userName}
              </p>
            </div>
            <div className="btn-group" style={{ background: '#fff', borderRadius: '12px', padding: '4px' }}>
              {['all', 'unread', 'read'].map((type) => (
                <button
                  key={type}
                  className="btn"
                  style={{
                    background: filter === type ? '#2196F3' : 'transparent',
                    color: filter === type ? '#fff' : '#2196F3',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <AnimatePresence>
        {filteredNotifications.map((notification, index) => {
          const typeStyles = getTypeStyles(notification.type);
          const priorityStyles = getPriorityStyles(notification.priority);

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card mb-3"
              style={{
                borderRadius: '12px',
                border: priorityStyles.border,
                background: priorityStyles.background,
                boxShadow: priorityStyles.shadow
              }}
            >
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div
                      style={{
                        background: typeStyles.background,
                        color: typeStyles.color,
                        borderRadius: '12px',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {typeStyles.icon}
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0" style={{ color: typeStyles.color }}>
                        {notification.title}
                        {notification.status === 'unread' && (
                          <span className="badge ms-2" style={{ 
                            background: 'rgba(244, 67, 54, 0.1)', 
                            color: '#f44336',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.8rem'
                          }}>
                            New
                          </span>
                        )}
                      </h5>
                      <small className="text-muted" style={{ fontSize: '0.9rem' }}>
                        {notification.timestamp}
                      </small>
                    </div>
                    <p className="mb-3" style={{ color: '#666' }}>
                      {notification.message}
                    </p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm me-2"
                        style={{
                          background: typeStyles.background,
                          color: typeStyles.color,
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 16px'
                        }}
                      >
                        {notification.action}
                      </button>
                      {notification.status === 'unread' && (
                        <button
                          className="btn btn-sm"
                          style={{
                            background: 'transparent',
                            color: '#666',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '8px 16px'
                          }}
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-5"
          style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #fff 100%)',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          <FaEnvelope size={48} style={{ color: '#2196F3' }} className="mb-3" />
          <h4 style={{ color: '#2196F3' }}>No notifications found</h4>
          <p className="text-muted">
            {filter === 'all' 
              ? "You don't have any notifications yet"
              : `No ${filter} notifications`
            }
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Notifications;