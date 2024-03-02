import React, { useState } from 'react';
import './Signup.css'; // Import CSS for styling
import Footer from './Footer';


function SignupPage() {
  const [fullName, setFullName]= useState ('');
  const [age, setAge] = useState('');const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitted, setSubmitted] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    // Here, you can add your Signup for handling the Signup action, such as sending a request to the server to authenticate the user.
    // For simplicity, let's just set submitted to true
    setSubmitted(true);
  };

  return (
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
            <form onSubmit={handleSignup}>
              <div className="signup-form-group">
              <label htmlFor="fullName">Full Name</label>
               <input
                type="text"
                 id="fullName"
                value={fullName}
                 onChange={(e) => setFullName(e.target.value)}
                 rquired
                
                
                 />
                 </div>
                 <span style={{ marginRight: '1px' }}></span>
                 <div className="signup-form-group">
                 <label htmlFor="age"> Age</label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  
                  min="6"
                  max="12"
                  required
                />
              </div>
              <span style={{ marginRight: '1px' }}></span>
             < div className="signup-form-group">
             <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                  required
                />
              </div>
              <span style={{ marginRight: '1px' }}></span>
              <div className ="signup-form-group">
              <label htmlFor="user name ">User Name </label>
                 <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              
                  required
                />
              </div>
              <span style={{ marginRight: '1px' }}></span>
              <div className="signup-form-group">
              <label htmlFor="password">Password</label>
               <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                
                  required
                />
              </div>
              <span style={{ marginRight: '1px' }}></span>
              <div className="signup-form-group">
              <label htmlFor="confirm password"> Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <span style={{ marginRight: '1px' }}></span>
              <div className="confirm-button-group">
                <button type="button" onClick={handleSignup}>Continue</button>
              </div>
            </form>
            {submitted}
            {/* Text and button for sign in option and password reset */}
            <div className="signup-additional-options">
              <p>By continuing you agree to our </p>
              <p><b>Terms & Conditions </b> and <b> Privacy Policy</b> </p>
              <p>Already have an account? <a href='/login'>Log In</a></p>
              
            </div>
          </div>
        </div>
      </div>
      <div><Footer /></div>
    </div>
    
  );
}

export default SignupPage;
