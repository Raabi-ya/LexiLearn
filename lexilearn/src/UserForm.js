import React, { useEffect, useState, useContext } from "react";
import "./UserForm.css"; // Import CSS file
import { doc, getDoc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { deleteUser } from "firebase/auth";

const UserForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState("");
  const [ageError, setAgeError] = useState("");
  const { dispatch } = useContext(AuthContext);
  const { navigate } = useNavigate();

  const getUser = async () => {
    const user = auth.currentUser;
    if(user){
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const userData = docSnap.data();
      setFullName(userData.fullName);
      setEmail(userData.email);
      setAge(userData.age);
      setUsername(userData.username);
    } else {
     // docSnap.data() will be undefined in this case
     console.log("No such document!");
    }
    
  }
  };

  useEffect(() => {
    getUser()
  }, []);

  const handleSave = async() => {
    // Validate empty fields
    if (!fullName || !email || !age || !username) {
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
    if (!isValidAge(age)) {
      setAgeError("Age should be between 6 and 12.");
      return;
    } else {
      setAgeError("");
    }

    const user = auth.currentUser;

    // Add a new document in collection "cities"
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      age, 
      username,
      timeStamp: serverTimestamp(),     
    });

    // Update the state variables with the new values
    setFullName(fullName);
    setEmail(email);
    setAge(age);
    setUsername(username);

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

  const isValidAge = (value) => {
    // Validate age between 6 and 12
    const ageValue = parseInt(value);
    return ageValue >= 6 && ageValue <= 12;
  };

  const handleDelete = () => {
    // Prompt the user for confirmation before deleting the account
    setIsDeleteConfirmationVisible(true);
  };

  const confirmDelete = async() => {
    const user = auth.currentUser;
    await deleteDoc(doc(db, "users", user.uid));

    // Add logic to delete the user's account
    console.log("Account deleted!");

    // Delete user account from Firebase Authentication
    await deleteUser(user);
    console.log("User account deleted from Authentication.");


    // Call handleSignOut after confirming the deletion
    handleSignOut();
    setIsDeleteConfirmationVisible(false);
  };

  const cancelDelete = () => {
    // Cancel the delete operation
    setIsDeleteConfirmationVisible(false);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch({ type: "LOGOUT" }); // Assuming you have a "LOGOUT" action in your reducer
      navigate("/"); // Redirect to home page
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  }


  return (
    <div>
      <div className="UserForm">
        <div className="content-container">
          <div className="profile-section">
            <img
              src="./user.png"
              alt="Profile"
              style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "20px", marginTop: "30px" }}
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
                  <div className="display-value">{fullName}</div>
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
                  <div className="display-value">{email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                {isEditing ? (
                  <>
                    <input
                      type="number"
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                    <div className="error-message">{ageError}</div>
                    {/*!dobError && <div className="error-message">{yearError}</div>*/}
                  </>
                ) : (
                  <div className="display-value">{age}</div>
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
      
    </div>
  );
};

export default UserForm;
