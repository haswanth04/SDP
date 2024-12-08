import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://sdp-sbwd.onrender.com/register', { name, email, password })
      .then(result => {
        console.log(result);
        alert('Registration successful! Please login.');
        navigate('/login');
      })
      .catch(err => {
        console.error('Registration error:', err);
        alert('Registration failed. Please try again.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card border-0 shadow" style={{ width: '400px' }}>
        <div className="card-body p-5">
          <h3 className="text-center mb-4">Create Your Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success btn-lg w-100">Sign Up</button>
          </form>
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-success">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
