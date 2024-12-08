import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaSearch, FaFilter } from 'react-icons/fa';
import googleLogo from './logos/google.jpeg';
import metaLogo from './logos/meta.jpeg';
import amazonLogo from './logos/amazon.jpeg';
import netflixLogo from './logos/netflix.jpeg';
import teslaLogo from './logos/tesla.jpeg';
import microsoftLogo from './logos/microsoft.jpeg';

const JobListings = ({ onApply }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  const jobCards = [
    {
      title: "Software Engineer",
      company: "Google",
      location: "Remote",
      image: googleLogo,
      salary: "$120,000 - $180,000",
      type: "Full-time",
      posted: "2 days ago",
      description: "Join our team to build next-generation cloud solutions and help shape the future of technology.",
      requirements: ["5+ years experience", "Bachelor's in CS", "Cloud expertise"]
    },
    {
      title: "Frontend Developer",
      company: "Meta",
      location: "New York, NY",
      image: metaLogo,
      salary: "$100,000 - $150,000",
      type: "Full-time",
      posted: "1 week ago",
      description: "Create engaging user experiences for billions of people worldwide.",
      requirements: ["3+ years experience", "React expertise", "UI/UX knowledge"]
    },
    {
      title: "Data Analyst",
      company: "Amazon",
      location: "San Francisco, CA",
      image: amazonLogo,
      salary: "$90,000 - $130,000",
      type: "Full-time",
      posted: "3 days ago",
      description: "Transform data into actionable insights that drive business decisions.",
      requirements: ["SQL proficiency", "Data visualization", "Statistical analysis"]
    },
    {
      title: "UI/UX Designer",
      company: "Netflix",
      location: "Los Angeles, CA",
      image: netflixLogo,
      salary: "$110,000 - $160,000",
      type: "Full-time",
      posted: "Just now",
      description: "Design the future of streaming entertainment and user experiences.",
      requirements: ["Figma expertise", "Portfolio required", "5+ years experience"]
    },
    {
      title: "Backend Developer",
      company: "Tesla",
      location: "Austin, TX",
      image: teslaLogo,
      salary: "$130,000 - $190,000",
      type: "Full-time",
      posted: "1 day ago",
      description: "Build scalable systems that power the future of sustainable energy.",
      requirements: ["Node.js expertise", "Distributed systems", "High performance"]
    },
    {
      title: "Project Manager",
      company: "Microsoft",
      location: "Chicago, IL",
      image: microsoftLogo,
      salary: "$115,000 - $170,000",
      type: "Full-time",
      posted: "4 days ago",
      description: "Lead cross-functional teams in delivering innovative solutions.",
      requirements: ["PMP certified", "Agile methodology", "5+ years experience"]
    },
  ];

  const filteredJobs = jobCards.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || job.type.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleApply = (job) => {
    if (!appliedJobs.has(job.title)) {
      setAppliedJobs(prev => new Set(prev).add(job.title));
      onApply(job);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mt-5"
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center mb-5"
      >
        <h1 className="display-4 fw-bold" style={{ 
          background: 'linear-gradient(45deg, #2196F3, #1976D2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Discover Your Next Opportunity
        </h1>
        <p className="lead text-muted">
          Explore curated positions from industry-leading companies
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="card shadow-sm mb-5">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search by title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FaFilter className="text-muted" />
                </span>
                <select
                  className="form-select border-start-0"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="row g-4">
        {filteredJobs.map((job, index) => (
          <motion.div
            className="col-md-6 col-lg-4"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <motion.div
              className="card h-100 shadow-sm border-0"
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              style={{ borderRadius: '15px', overflow: 'hidden' }}
            >
              <div className="position-relative">
                <div className="company-logo-container">
                  <img
                    src={job.image}
                    alt={`${job.company} Logo`}
                    className="company-logo"
                  />
                </div>
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-light text-dark shadow-sm">
                    {job.posted}
                  </span>
                </div>
              </div>
              
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title text-primary mb-0">{job.title}</h5>
                  <span className="badge bg-primary bg-opacity-10 text-primary">
                    {job.type}
                  </span>
                </div>
                <h6 className="text-muted mb-3">{job.company}</h6>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center text-muted mb-2">
                    <FaMapMarkerAlt className="me-2" />
                    {job.location}
                  </div>
                  <div className="d-flex align-items-center text-muted mb-2">
                    <FaDollarSign className="me-2" />
                    {job.salary}
                  </div>
                  <div className="d-flex align-items-center text-muted">
                    <FaClock className="me-2" />
                    {job.posted}
                  </div>
                </div>

                <p className="card-text text-muted small mb-3">
                  {job.description}
                </p>

                <div className="mb-3">
                  {job.requirements.map((req, idx) => (
                    <span
                      key={idx}
                      className="badge bg-light text-dark me-2 mb-2"
                      style={{ fontSize: '0.8rem' }}
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-footer bg-white border-0 pt-0">
                <motion.button
                  className={`btn ${appliedJobs.has(job.title) ? 'btn-danger' : 'btn-primary'} w-100`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApply(job)}
                  disabled={appliedJobs.has(job.title)}
                >
                  {appliedJobs.has(job.title) ? 'Applied' : 'Apply Now'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-5"
        >
          <FaSearch size={48} className="text-muted mb-3" />
          <h4>No jobs found</h4>
          <p className="text-muted">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}

      <style jsx>{`
        .company-logo-container {
          height: 120px;
          background: linear-gradient(to bottom, #f8f9fa, #ffffff);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .company-logo {
          max-height: 80px;
          max-width: 80%;
          object-fit: contain;
          filter: none;
        }

        .card {
          transition: all 0.3s ease;
        }

        .card:hover .company-logo {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        .badge {
          font-size: 0.8rem;
          padding: 0.5em 1em;
        }

        .card-body {
          padding: 1.5rem;
        }

        .card-footer {
          background: transparent;
          border-top: none;
          padding: 1rem 1.5rem 1.5rem;
        }

        .btn-primary {
          padding: 0.6rem 1.5rem;
          font-weight: 500;
          letter-spacing: 0.3px;
        }
      `}</style>
    </motion.div>
  );
};

export default JobListings;
