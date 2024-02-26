// UserForm.js
import React, { useState } from "react";
import "./UserForm.css"; // Import CSS file

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [username, setUsername] = useState("");

  const handleSave = () => {
    // Add logic to save the user's profile details
    console.log("Profile details saved!");
  };

  return (
    <div className="UserForm">
      <div className="content-container">
        <div className="logo-section">
          <img src="path/to/your/logo.png" alt="Logo" />
        </div>
        <div className="profile-section">
          <h2>Your Profile</h2>
          <form className="user-save-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                placeholder={`Edit: ${fullName}`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder={`Edit: ${email}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                placeholder={`Edit: ${dob}`}
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                placeholder={`Edit: ${username}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
