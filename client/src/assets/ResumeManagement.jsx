import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaUpload, FaTrash, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ResumeManagement = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');
      return;
    }
    fetchResumes();
  }, [navigate]);

  const fetchResumes = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await axios.get('https://sdp-sbwd.onrender.com/resumes', {
        headers: {
          'email': userEmail
        }
      });
      setResumes(response.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.error || 'Failed to fetch resumes');
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      setError('User not authenticated');
      return;
    }

    if (!selectedFile || !uploadTitle) {
      setError('Please select a file and provide a title');
      return;
    }

    // Check file size
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should not exceed 5MB');
      return;
    }

    // Check file type
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileExt = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(fileExt)) {
      setError('Only PDF and Word documents are allowed');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('title', uploadTitle);
    formData.append('email', userEmail);

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://sdp-sbwd.onrender.com/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'email': userEmail
        }
      });
      setSuccess('Resume uploaded successfully');
      fetchResumes();
      setSelectedFile(null);
      setUploadTitle('');
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || 'Failed to upload resume');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resumeId) => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      setError('User not authenticated');
      return;
    }

    try {
      await axios.delete(`https://sdp-sbwd.onrender.com/resume/${resumeId}`, {
        headers: {
          'email': userEmail
        }
      });
      setSuccess('Resume deleted successfully');
      fetchResumes();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.error || 'Failed to delete resume');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mt-5"
    >
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Upload New Resume</h5>
              <form onSubmit={handleUpload} encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label">Resume Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="E.g., Software Developer Resume"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">File</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload Resume'} <FaUpload className="ms-2" />
                </button>
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {success && <div className="alert alert-success mt-3">{success}</div>}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">My Resumes</h5>
              {resumes.length === 0 ? (
                <p className="text-muted">No resumes uploaded yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Upload Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resumes.map((resume) => (
                        <tr key={resume._id}>
                          <td>{resume.title}</td>
                          <td>{new Date(resume.uploadDate).toLocaleDateString()}</td>
                          <td>
                            <span className={`badge bg-${resume.status === 'active' ? 'success' : 'secondary'}`}>
                              {resume.status}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => window.open(resume.fileUrl)}
                              >
                                <FaDownload />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(resume._id)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeManagement; 
