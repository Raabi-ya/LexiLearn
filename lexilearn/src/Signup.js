import React, { useState, useContext } from 'react';
import './Signup.css'; // Import CSS for styling
import Footer from './Footer';
import { doc, serverTimestamp, setDoc, } from "firebase/firestore";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from './context/AuthContext';  // Import AuthContext
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword  } from "firebase/auth";

function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateAge = (value) => {
    if (!value) {
      setAgeError('Age is required');
    } else if (value < 6 || value > 12) {
      setAgeError('Age should be between 6 and 12');
    } else {
      setAgeError('');
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('Email is required');
    } else if (!value.includes('@')) {
      setEmailError('Email should contain @');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Password is required');
    } else if (value.length < 8) {
      setPasswordError('Password should have at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = (value) => {
    if (!value) {
      setConfirmPasswordError('Confirm Password is required');
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleAdd = async(e) => {
    e.preventDefault();

    try{
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Log in the user immediately after signing up
      await signInWithEmailAndPassword(auth, email, password);

      // Update the context with the current user information
      dispatch({ type: "LOGIN", payload: res.user });

      await setDoc(doc(db, "users", res.user.uid), {
        fullName: fullName,
        age: age,
        email: email,
        username: username,
        timeStamp: serverTimestamp(),
      });

      // Navigate to the home page
      navigate('/');
    }
    catch(err){
      console.log(err);
    }

    // Reset previous error messages
    setFullNameError('');
    setAgeError('');
    setEmailError('');
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let hasErrors = false;

    // Validation logic for each field
    if (!fullName) {
      hasErrors = true;
      setFullNameError('Full Name is required');
    }

    validateAge(age);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    // Set submitted only if there are no errors
    if (!hasErrors) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      <div className="signup-page">
        {/* Grouping the form and image together */}
        <div className="signup-container">
          {/* Picture Section */}
          <div className="signup-left-section">
            <img src="/signup.png" alt="Signup" />
          </div>
          {/* Signup Form Section */}
          <div className="signup-right-section">
            <div className="Signup-form">
              <h2>Let's Get Started!!</h2>
              <h4>Sign up your account </h4>
              <form onSubmit={handleAdd}>
                <div className="signup-form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  {fullNameError && <div className="error-message">{fullNameError}</div>}
                </div>
                <div className="signup-form-group">
                  <label htmlFor="age"> Age</label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      validateAge(e.target.value);
                    }}
                    min="6"
                    max="12"
                    required
                  />
                  {ageError && <div className="error-message">{ageError}</div>}
                </div>
                <div className="signup-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                    required
                  />
                  {emailError && <div className="error-message">{emailError}</div>}
                </div>
                <div className="signup-form-group">
                  <label htmlFor="user name ">User Name </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  {usernameError && <div className="error-message">{usernameError}</div>}
                </div>
                <div className="signup-form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                      validateConfirmPassword(confirmPassword); // Validate confirm password on password change
                    }}
                    required
                  />
                  {passwordError && <div className="error-message">{passwordError}</div>}
                </div>
                <div className="signup-form-group">
                  <label htmlFor="confirm password"> Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      validateConfirmPassword(e.target.value);
                    }}
                    required
                  />
                  {confirmPasswordError && (
                    <div className="error-message">{confirmPasswordError}</div>
                  )}
                </div>
                <div className="confirm-button-group">
                  <button type="submit">
                    Register
                  </button>
                </div>
              </form>
              {submitted}
              {/* Text and button for sign in option and password reset */}
              <div className="signup-additional-options">
                <p>By registering you agree to our </p>
                <p>
                  <b>Terms & Conditions </b> and <b> Privacy Policy</b>{' '}
                </p>
                <p>
                  Already have an account? <a href="/LoginPage">Log In</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      <Footer />
      </div>
    </div>
  );
}

export default SignupPage;
