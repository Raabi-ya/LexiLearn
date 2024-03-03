import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS for styling

function LoginPage() {
  const [error,setError]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword (auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    navigate("/")
    // ...
  })
  .catch((error) => {
    setError(true)
    // ..
  });

  };

  return (
    <div className="login-page">
      {/* Picture Section */}
      <div className="left-section">
        <img src="/login.jpg" alt="Child Learning" />
      </div>
      {/* Login Form Section */}
      <div className="right-section">
        <h2> Welcome to LexiLearn! </h2>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email"><FontAwesomeIcon icon={faUser} /> E-mail </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <span style={{ marginRight: '10px' }}></span>
            <div className="form-group">
              <label htmlFor="password"><FontAwesomeIcon icon={faLock} /> Password </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="button-group">
            <button type="submit">Login</button>
            </div>
              {error && <span> Wrong email or password! </span>}
          </form>
        <div className="additional-options">
          <p>Don't have an account? <a href='signup'> Sign Up </a></p>
          <p>Forgot your password? <a href='reset'> Reset Password </a></p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
