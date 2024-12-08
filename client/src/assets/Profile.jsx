import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub, FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

const Profile = () => {
  const userEmail = localStorage.getItem('userEmail');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'John Doe');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: userName,
    about: localStorage.getItem('userAbout') || 'No description added yet.',
    role: 'Senior Software Developer',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    experience: [
      {
        company: 'Tech Solutions Inc.',
        role: 'Senior Software Developer',
        duration: '2021 - Present',
        description: 'Led development of cloud-based applications using React and Node.js'
      },
      {
        company: 'Digital Innovations Co.',
        role: 'Software Developer',
        duration: '2018 - 2021',
        description: 'Developed and maintained multiple web applications'
      }
    ],
    education: [
      {
        institution: 'Stanford University',
        degree: 'Master of Computer Science',
        duration: '2016 - 2018'
      },
      {
        institution: 'University of California',
        degree: 'Bachelor of Computer Science',
        duration: '2012 - 2016'
      }
    ],
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'TypeScript', 'GraphQL']
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setUserName(editedProfile.name);
    localStorage.setItem('userName', editedProfile.name);
    localStorage.setItem('userAbout', editedProfile.about);
    // Here you would typically make an API call to update the backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({
      ...editedProfile,
      name: userName,
      about: localStorage.getItem('userAbout') || 'No description added yet.'
    });
  };

  const addExperience = () => {
    setEditedProfile({
      ...editedProfile,
      experience: [
        ...editedProfile.experience,
        {
          company: '',
          role: '',
          duration: '',
          description: ''
        }
      ]
    });
  };

  const removeExperience = (index) => {
    const newExperience = [...editedProfile.experience];
    newExperience.splice(index, 1);
    setEditedProfile({
      ...editedProfile,
      experience: newExperience
    });
  };

  const updateExperience = (index, field, value) => {
    const newExperience = [...editedProfile.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    };
    setEditedProfile({
      ...editedProfile,
      experience: newExperience
    });
  };

  const addEducation = () => {
    setEditedProfile({
      ...editedProfile,
      education: [
        ...editedProfile.education,
        {
          institution: '',
          degree: '',
          duration: ''
        }
      ]
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...editedProfile.education];
    newEducation.splice(index, 1);
    setEditedProfile({
      ...editedProfile,
      education: newEducation
    });
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...editedProfile.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    setEditedProfile({
      ...editedProfile,
      education: newEducation
    });
  };

  const addSkill = () => {
    const newSkill = prompt('Enter new skill:');
    if (newSkill && !editedProfile.skills.includes(newSkill)) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, newSkill]
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  // Render functions for each section
  const renderExperience = (exp, index) => {
    if (isEditing) {
      return (
        <div key={index} className="mb-4 border p-3 rounded">
          <div className="d-flex justify-content-end mb-2">
            <button 
              className="btn btn-sm btn-danger"
              onClick={() => removeExperience(index)}
            >
              <FaTrash />
            </button>
          </div>
          <input
            className="form-control mb-2"
            value={exp.role}
            onChange={(e) => updateExperience(index, 'role', e.target.value)}
            placeholder="Role"
          />
          <input
            className="form-control mb-2"
            value={exp.company}
            onChange={(e) => updateExperience(index, 'company', e.target.value)}
            placeholder="Company"
          />
          <input
            className="form-control mb-2"
            value={exp.duration}
            onChange={(e) => updateExperience(index, 'duration', e.target.value)}
            placeholder="Duration"
          />
          <textarea
            className="form-control"
            value={exp.description}
            onChange={(e) => updateExperience(index, 'description', e.target.value)}
            placeholder="Description"
            rows="3"
          />
        </div>
      );
    }

    return (
      <div key={index} className="mb-4">
        <h5>{exp.role}</h5>
        <p className="text-primary mb-2">{exp.company}</p>
        <p className="text-muted mb-2">{exp.duration}</p>
        <p>{exp.description}</p>
        {index < editedProfile.experience.length - 1 && <hr />}
      </div>
    );
  };

  const renderEducation = (edu, index) => {
    if (isEditing) {
      return (
        <div key={index} className="mb-4 border p-3 rounded">
          <div className="d-flex justify-content-end mb-2">
            <button 
              className="btn btn-sm btn-danger"
              onClick={() => removeEducation(index)}
            >
              <FaTrash />
            </button>
          </div>
          <input
            className="form-control mb-2"
            value={edu.degree}
            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
            placeholder="Degree"
          />
          <input
            className="form-control mb-2"
            value={edu.institution}
            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
            placeholder="Institution"
          />
          <input
            className="form-control"
            value={edu.duration}
            onChange={(e) => updateEducation(index, 'duration', e.target.value)}
            placeholder="Duration"
          />
        </div>
      );
    }

    return (
      <div key={index} className="mb-3">
        <h5>{edu.degree}</h5>
        <p className="text-primary mb-1">{edu.institution}</p>
        <p className="text-muted">{edu.duration}</p>
        {index < editedProfile.education.length - 1 && <hr />}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container my-5"
    >
      {/* Profile Header */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="bg-primary rounded-circle p-3 text-white" style={{ width: 80, height: 80 }}>
                <FaUser size={40} className="m-2" />
              </div>
            </div>
            <div className="col">
              {isEditing ? (
                <input
                  type="text"
                  className="form-control form-control-lg mb-2"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                />
              ) : (
                <h2 className="mb-1">{userName}</h2>
              )}
              <p className="text-muted mb-2">{editedProfile.role}</p>
              <div className="d-flex flex-wrap gap-3">
                <span className="text-muted">
                  <FaMapMarkerAlt className="me-2" />{editedProfile.location}
                </span>
                <span className="text-muted">
                  <FaEnvelope className="me-2" />{userEmail}
                </span>
                <span className="text-muted">
                  <FaPhone className="me-2" />{editedProfile.phone}
                </span>
              </div>
            </div>
            <div className="col-auto">
              {isEditing ? (
                <>
                  <button className="btn btn-success me-2" onClick={handleSave}>
                    <FaSave className="me-2" />Save
                  </button>
                  <button className="btn btn-outline-secondary" onClick={handleCancel}>
                    <FaTimes className="me-2" />Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleEdit}>
                  <FaEdit className="me-2" />Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="card shadow-sm mb-4"
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="card-title mb-0">About Me</h3>
            {isEditing && (
              <button className="btn btn-outline-primary btn-sm">
                <FaEdit className="me-2" />Edit
              </button>
            )}
          </div>
          {isEditing ? (
            <textarea
              className="form-control"
              rows="4"
              value={editedProfile.about}
              onChange={(e) => setEditedProfile({...editedProfile, about: e.target.value})}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p>{editedProfile.about}</p>
          )}
        </div>
      </motion.div>

      <div className="row">
        <div className="col-md-8">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card shadow-sm mb-4"
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="card-title mb-0">
                  <FaBriefcase className="me-2 text-primary" />Experience
                </h3>
                {isEditing && (
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={addExperience}
                  >
                    <FaPlus className="me-2" />Add Experience
                  </button>
                )}
              </div>
              {editedProfile.experience.map((exp, index) => renderExperience(exp, index))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card shadow-sm mb-4"
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="card-title mb-0">
                  <FaGraduationCap className="me-2 text-primary" />Education
                </h3>
                {isEditing && (
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={addEducation}
                  >
                    <FaPlus className="me-2" />Add Education
                  </button>
                )}
              </div>
              {editedProfile.education.map((edu, index) => renderEducation(edu, index))}
            </div>
          </motion.div>
        </div>

        <div className="col-md-4">
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card shadow-sm mb-4"
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="card-title mb-0">Skills</h3>
                {isEditing && (
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={addSkill}
                  >
                    <FaPlus className="me-2" />Add Skill
                  </button>
                )}
              </div>
              <div className="d-flex flex-wrap gap-2">
                {editedProfile.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="badge bg-primary bg-opacity-10 text-primary p-2"
                    style={{ cursor: isEditing ? 'pointer' : 'default' }}
                    onClick={() => isEditing && removeSkill(skill)}
                  >
                    {skill}
                    {isEditing && <FaTimes className="ms-2" />}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="card shadow-sm"
          >
            <div className="card-body p-4">
              <h3 className="card-title mb-4">Quick Actions</h3>
              <div className="d-grid gap-2">
                {isEditing ? (
                  <>
                    <button className="btn btn-success" onClick={handleSave}>
                      <FaSave className="me-2" />Save Changes
                    </button>
                    <button className="btn btn-outline-secondary" onClick={handleCancel}>
                      <FaTimes className="me-2" />Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={handleEdit}>
                    <FaEdit className="me-2" />Edit Profile
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;