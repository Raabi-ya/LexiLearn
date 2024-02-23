import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css'; // Import CSS for styling

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = () => {
    // Here, you can add your logic for handling the login action, such as sending a request to the server to authenticate the user.
    // For simplicity, let's just set submitted to true
    setSubmitted(true);
  };

  return (
    <div className="login-page">
      {/* Grouping the form and image together */}
      <div className="login-container">
        {/* Picture Section */}
        <div className="left-section">
          <img src="/login.jpg" alt="Child Learning" />
        </div>
        {/* Login Form Section */}
        <div className="right-section">
          <h2>Welcome to LexiLearn!</h2>
          <div className="login-form">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username"><FontAwesomeIcon icon={faUser} /> Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <span style={{ marginRight: '10px' }}></span>
              <div className="form-group">
                <label htmlFor="password"><FontAwesomeIcon icon={faLock} /> Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="button-group">
                <button type="button" onClick={handleLogin}>Login</button>
              </div>
            </form>
            {submitted}
            {/* Text and button for sign in option and password reset */}
            <div className="additional-options">
              <p>Don't have an account? <a href='signup'>Sign Up</a></p>
              <p>Forgot your password? <a href='reset'>Reset Password</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
