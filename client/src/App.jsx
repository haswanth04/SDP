import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './assets/Signup'
import Login from './assets/Login'
import Navbar from './assets/Navbar'
import Home from './assets/Home'
import JobListings from './assets/JobListings'
import MyApplications from './assets/MyApplications'
import Profile from './assets/Profile'
import Notifications from './assets/Notifications'
import Chatbot from './assets/Chatbot'
import ResumeManagement from './assets/ResumeManagement'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

// Create a wrapper component to use useLocation
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [applications, setApplications] = useState([])
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleApply = (job) => {
    if (!applications.some(app => app.title === job.title && app.company === job.company)) {
      setApplications((prev) => [...prev, job])
      alert(`Applied for ${job.title} at ${job.company}`)
    } else {
      alert(`You have already applied for ${job.title} at ${job.company}`)
    }
  }

  const handleRemove = (jobToRemove) => {
    setApplications((prev) => 
      prev.filter(app => app.title !== jobToRemove.title || app.company !== jobToRemove.company)
    )
  }

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  };

  // Check if current path is login or signup
  const isAuthPage = (pathname) => {
    return pathname === '/login' || pathname === '/signup' || pathname === '/';
  };

  return (
    <>
      {/* Only show Navbar if user is logged in AND not on auth pages */}
      {isLoggedIn && !isAuthPage(location.pathname) && (
        <Navbar setIsLoggedIn={setIsLoggedIn} />
      )}
      
      <Routes>
        {/* Default route - Show Signup */}
        <Route path="/" element={<Signup />} />
        
        {/* Explicit routes for auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobListings onApply={handleApply} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <MyApplications applications={applications} onRemove={handleRemove} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumes"
          element={
            <ProtectedRoute>
              <ResumeManagement />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </>
  );
}

// Main App component
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
