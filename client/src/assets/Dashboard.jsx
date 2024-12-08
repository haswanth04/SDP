import React, { useState } from 'react';
import JobListings from './JobListings';
import MyApplications from './MyApplications';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);

  const handleApply = (job) => {
    // Add the job to the applications state
    setApplications(prev => [...prev, job]);
  };

  const handleRemove = (jobToRemove) => {
    // Remove the job from the applications state
    setApplications(prev => prev.filter(job => job.title !== jobToRemove.title));
  };

  return (
    <div>
      <JobListings onApply={handleApply} />
      <MyApplications applications={applications} onRemove={handleRemove} />
    </div>
  );
};

export default Dashboard; 