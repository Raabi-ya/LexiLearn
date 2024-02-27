import React, { useState } from "react";
import "./UserForm.css"; // Import CSS file

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Add logic to save the user's profile details
    console.log("Profile details saved!");
    setIsEditing(false);
  };

  return (
    <div className="UserForm">
      <div className="content-container">
        <div className="logo-section">
          <img src="path/to/your/logo.png" alt="Logo" />
        </div>
        <div className="profile-section">
          <h2>Your Profile</h2>
          <div className="user-save-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              ) : (
                <div className="display-value">{fullName}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              ) : (
                <div className="display-value">{email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              {isEditing ? (
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  required
                />
              ) : (
                <div className="display-value">{dob}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              {isEditing ? (
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              ) : (
                <div className="display-value">{username}</div>
              )}
            </div>
            {isEditing ? (
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
