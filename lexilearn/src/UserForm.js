import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import "./UserForm.css"; // Import CSS file
import { db, auth } from './firebase';

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [dobError, setDOBError] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState("");
  const [yearError, setYearError] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;

      if (user) {
        const userId = user.uid;

        try {
          const doc = await db.collection('users').doc(userId).get();

          if (doc.exists) {
            const userDataFromFirestore = doc.data();
            setUserData(userDataFromFirestore);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.log('Error getting document:', error);
        }
      } else {
        console.log('No user is signed in!');
      }
    };

    fetchUserData();
  }, []);

  const handleSave = () => {
    // Validate empty fields
    if (!fullName || !email || !dob || !username) {
      setEmptyFieldError("Please fill in all required fields.");
      return;
    } else {
      setEmptyFieldError("");
    }

    // Validate email
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    // Validate age
    if (!isValidDOB(dob)) {
      setDOBError("Please enter a valid date of birth.");
      return;
    } else {
      setDOBError("");
    }

    // Validate year
    if (!isValidYear(dob)) {
      setYearError("Oops! It looks like you're not eligible to access this content.");
      return;
    } else {
      setYearError("");
    }

    // Add logic to save the user's profile details
    console.log("Profile details saved!");
    setIsEditing(false);
  };

  const isValidEmail = (value) => {
    // Simple email validation
    const isValid = /\S+@\S+\.\S+/.test(value);
    if (!isValid) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
    return isValid;
  };

  const isValidDOB = (value) => {
    // Validate date of birth (YYYY-MM-DD)
    const dateOfBirth = new Date(value);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    return age >= 4 && age <= 120; // Assuming a reasonable age range
  };

  const isValidYear = (value) => {
    // Validate year (YYYY)
    const year = value.substring(0, 4); // Extract first 4 characters
    return /^\d{4}$/.test(year) && parseInt(year) >= 2012 && parseInt(year) <= 2018;
  };

  const handleDelete = () => {
    // Prompt the user for confirmation before deleting the account
    setIsDeleteConfirmationVisible(true);
  };

  const confirmDelete = () => {
    // Add logic to delete the user's account
    console.log("Account deleted!");
    setIsDeleteConfirmationVisible(false);
  };

  const cancelDelete = () => {
    // Cancel the delete operation
    setIsDeleteConfirmationVisible(false);
  };

  return (
    <div>
      <div className="UserForm">
        <div className="content-container">
          <div className="profile-section">
            <img
              src="https://img.freepik.com/premium-vector/set-kids-faces-avatars-children-heads-different-nationality-flat-style_283146-615.jpg"
              alt="Profile"
              style={{ width: "150px", height: "150px", marginBottom: "20px" }}
            />
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
                  //<div className="display-value">{fullName}</div>
                  <input type="text" id="fullName" value={userData?.fullName || ''} readOnly />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        isValidEmail(e.target.value);
                      }}
                      required
                    />
                    <div className="error-message">{emailError}</div>
                  </>
                ) : (
                  //<div className="display-value">{email}</div>
                  <input type="email" id="email" value={userData?.email || ''} readOnly />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="dob">Age</label>
                {isEditing ? (
                  <>
                    <input
                      type="date"
                      id="dob"
                      value={dob}
                      onChange={(e) => setDOB(e.target.value)}
                      required
                    />
                    <div className="error-message">{dobError}</div>
                    {!dobError && <div className="error-message">{yearError}</div>}
                  </>
                ) : (
                  //<div className="display-value">{dob}</div>
                  <input type="number" id="age" value={userData?.age || ''} readOnly />
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
                  //<div className="display-value">{username}</div>
                  <input type="text" id="username" value={userData?.username || ''} readOnly />
                )}
              </div>
              {isEditing ? (
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <>
                  <button
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"  
                    onClick={handleDelete}
                  >
                    Delete Account
                  </button>
                </>
              )}
              {isDeleteConfirmationVisible && (
                <div className="delete-confirmation-dialog">
                  <p>Are you sure you want to delete your account?</p>
                  <button onClick={confirmDelete}>Yes</button>
                  <button onClick={cancelDelete}>No</button>
                </div>
              )}
              <div className="error-message">{emptyFieldError}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UserForm;
