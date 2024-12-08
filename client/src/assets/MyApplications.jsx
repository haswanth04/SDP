import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MyApplications = ({ applications, onRemove }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Applications</h2>
      {applications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-5"
        >
          <h4>No applications submitted yet.</h4>
          <p className="text-muted">Start applying for jobs to see them here!</p>
        </motion.div>
      ) : (
        <div className="row">
          {applications.map((app, index) => (
            <motion.div
              key={index}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">{app.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{app.company}</h6>
                  <p className="card-text">{app.description}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => onRemove(app)}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;