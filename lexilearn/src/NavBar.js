import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { auth } from "./firebase";
import "./NavBar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const { currentUser, dispatch } = useContext(AuthContext);
  const { navigate } = useNavigate();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch({ type: "LOGOUT" }); // Assuming you have a "LOGOUT" action in your reducer
      navigate("/login"); // Redirect to login page or any other appropriate route
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  }

  return (
    <div className={`navbar ${openLinks ? "open" : "close"}`}>
      <div className="leftSide">
        <button className="toggleButton" onClick={toggleNavbar}>
          ☰
        </button>
        <img src="/lexiLearnLogo.png" alt="Logo" />
        <div className="hiddenLinks">
          <Link to="/">Home</Link>
          <Link to="/SelectLevelsPage">Levels</Link>
          <Link to="/UserForm">User Profile</Link>
          <Link to="/AboutUsPage">Progress</Link>
          {/*<Link to="/LoginPage">Sign In</Link>*/}
          {/*{currentUser ? (
          <span>Welcome, {username}</span>
          
        ) : (
          <Link to="/LoginPage">Login</Link>
        )}*/}

          {currentUser && <span>Welcome, {currentUser.email}</span>}
          {currentUser && <Link to="#" onClick={handleSignOut}>Sign Out</Link>}
          {!currentUser && <Link to="/LoginPage">Login</Link>}

          {/*<Link to="/Signup">Sign Up</Link>*/}

          {/* Conditionally render Sign Up link based on the user's login status */}
          {/*{!currentUser && <Link to="/Signup">Sign Up</Link>}*/}
          {/*<Link to="#" onClick={handleSignOut}>Sign Out</Link>*/}
        </div>
      </div>
      <div className="rightSide">
        <Link to="/">Home</Link>
        <Link to="/SelectLevelsPage">Levels</Link>
        <Link to="/UserForm">User Profile</Link>
        <Link to="/AboutUsPage">Progress</Link>
        {/*<Link to="/LoginPage">Sign In</Link>*/}
        {/*{currentUser ? (
          <span>Welcome, {username}</span>
        ) : (
          <Link to="/LoginPage">Login</Link>
        )}*/}

        {currentUser && <span>Welcome, {currentUser.email}</span>}
        {currentUser && <Link to="#" onClick={handleSignOut}>Sign Out</Link>}
        {!currentUser && <Link to="/LoginPage">Login</Link>}

        {/*<Link to="/Signup">Sign Up</Link>*/}

        {/* Conditionally render Sign Up link based on the user's login status */}
        {/*{!currentUser && <Link to="/Signup">Sign Up</Link>}*/}
        {/*<Link to="#" onClick={handleSignOut}>Sign Out</Link>*/}
      </div>
    </div>
  );
}

export default Navbar;
