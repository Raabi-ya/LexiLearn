import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { sendPasswordResetEmail, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './Login.css'; // Import CSS for styling
import { AuthContext } from './context/AuthContext';


function LoginPage() {
  const [error,setError]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)
  

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword (auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    dispatch({type:"LOGIN", payload:user})
    navigate("/")
    // ...
  })
  .catch((error) => {
    setError(true)
    // ..
  });

  };

  const handlePasswordReset = () =>{
    /*const email= prompt("Please enter your email!");
    sendPasswordResetEmail(auth,email)
    alert("Please check your inbox for the reset password instructions!")*/
    // Check if the user clicked cancel

    const email = prompt("Please enter your email!")
    if (email === null) {
      // User clicked cancel, do nothing
      return;
    }

    // User provided an email, send password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your inbox for the reset password instructions!");
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        alert("An error occurred while sending the password reset email. Please try again later.");
      });
  }

  return (
    <div>
    <div className="login-page">
      {/* Picture Section */}
      <div className="left-section">
        <img src="./login-img.png" alt="Child Learning" />
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
              {error && <span id='error-message'> Wrong email or password! </span>}
          </form>
        <div className="additional-options">
          <p>Don't have an account? <a href='signup'> Sign Up </a></p>
          <p>Forgot your password? <span onClick={handlePasswordReset} className='forgot-password'>Reset Password</span>  </p>
        </div>
        </div>
      </div>
    </div>
    <div>< Footer /></div>
    </div>
  );
}

export default LoginPage;
