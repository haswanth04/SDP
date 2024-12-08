import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBriefcase, FaChartLine, FaBuilding, FaClock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Google from './logos/google.jpeg';
import Amazon from './logos/amazon.jpeg';
import Microsoft from './logos/microsoft.jpeg';
import Meta from './logos/meta.jpeg';
import Netflix from './logos/netflix.jpeg';
import Tesla from './logos/tesla.jpeg';

// Import logos
const logos = {
  Google,
  Amazon,
  Microsoft,
  Meta,
  Netflix,
  Tesla,
};

const JobCard = ({ icon, title, description, onClick }) => (
  <div className="col-md-4 mb-4" onClick={onClick}>
    <div className="card shadow-sm">
      <div className="card-body text-center">
        {icon}
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const handleJobCardClick = (jobType) => {
    navigate(`/jobs/${jobType}`); // Navigate to the job listings for the selected type
  };

  return (
    <div>
      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to JobSync</h1>
          <p className="lead">Your one-stop platform to match talent with opportunities.</p>
          <button className="btn btn-light btn-lg mt-3" onClick={() => navigate('/jobs')}>
            Explore Jobs
          </button>
        </div>
      </header>

      {/* Trending in the Job Market */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Trending in the Job Market</h2>
          <div className="row text-center">
            <JobCard 
              icon={<FaChartLine size={50} className="text-primary mb-3" />} 
              title="Data Science" 
              description="Data Science is the fastest-growing industry, with massive demand for skilled professionals."
              onClick={() => handleJobCardClick('data-science')}
            />
            <JobCard 
              icon={<FaBriefcase size={50} className="text-primary mb-3" />} 
              title="Software Development" 
              description="Software development remains a staple with companies seeking skilled developers across industries."
              onClick={() => handleJobCardClick('software-development')}
            />
            <JobCard 
              icon={<FaBuilding size={50} className="text-primary mb-3" />} 
              title="Business Analysis" 
              description="Business Analysts continue to be in high demand as companies strive for smarter strategies and growth."
              onClick={() => handleJobCardClick('business-analysis')}
            />
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4">Featured Companies</h2>
          <div className="row justify-content-center">
            {Object.entries(logos).map(([name, src]) => (
              <div className="col-2 mb-3" key={name}>
                <img src={src} alt={`${name} Logo`} className="img-fluid" style={{ maxWidth: "120px" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Latest Job Market Trends</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">AI Revolutionizing Job Search</h5>
                  <p className="card-text">
                    Learn how AI is transforming the way job seekers connect
                    with companies.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Top Skills for 2024</h5>
                  <p className="card-text">
                    Discover the top skills that are in high demand this year.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Remote Work: The Future?</h5>
                  <p className="card-text">
                    Explore the rise of remote jobs and what this means for
                    your career.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Tracking Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Track Your Job Applications</h2>
          <p className="lead mb-4">
            Stay up to date with the status of your applications with our
            intuitive tracking system.
          </p>
          <Link to="/applications" className="btn btn-primary btn-lg">Track Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;