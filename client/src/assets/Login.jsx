import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        if (result.data === "Success") {
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', result.data.name || email.split('@')[0]);
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedIn(true);
          navigate('/home');
        } else {
          alert(result.data);
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        alert('Login failed. Please try again.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card border-0 shadow" style={{ width: '400px' }}>
        <div className="card-body p-5">
          <h3 className="text-center mb-4">Welcome Back!</h3>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary btn-lg w-100">Login</button>
          </form>
          <p className="text-center mt-4">
            Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
