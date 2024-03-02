import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { doSignInWithEmailAndPassword, doSendEmailVerification } from './firebase/auth'; // Added doSendEmailVerification
import { useAuth } from './contexts/authContexts';
import { Link } from 'react-router-dom'; // Imported Navigate and useNavigate
import './Login.css'; // Import CSS for styling

function LoginPage() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => { // Added async keyword and e parameter
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        await doSendEmailVerification(); // Added await
        Link('/Home'); // Navigate to Home after successful login
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {userLoggedIn && <Link to={'/Home'} replace={true} />} {/* Moved inside fragment */}
      <div className="login-page">
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
                <label htmlFor="email"><FontAwesomeIcon icon={faUser} /> Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit">Login</button> {/* Changed type to "submit" */}
              </div>
            </form>
            {/* Display error message if there's any */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {/* Text and button for sign in option and password reset */}
            <div className="additional-options">
              <p>Don't have an account? <Link to="./Signup">Sign Up</Link></p>
              <p>Forgot your password? <Link to="#">Reset Password</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
