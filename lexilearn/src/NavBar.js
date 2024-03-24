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
  
  //Toggle a=bar function
  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  //Handling the sign out function
  const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch({ type: "LOGOUT" }); 
      navigate("/login"); 
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  }

  return (
    <div className={`navbar ${openLinks ? "open" : "close"}`}>
      <div className="leftSide">
        {/* Toggle button */}
        <button className="toggleButton" onClick={toggleNavbar}>
          ☰
        </button>
        <img src="/lexiLearnLogo.png" alt="Logo" />
        {/* Navigating to the pages */}
        <div className="hiddenLinks">
          <Link to="/">Home</Link>
          <Link to="/SelectLevelsPage">Levels</Link>
          <Link to="/UserForm">User Profile</Link>
          <Link to="/Progress">Progress</Link>
          

          {currentUser && <span>Welcome, {currentUser.email}</span>}
          {currentUser && <Link to="#" onClick={handleSignOut}>Sign Out</Link>}
          {!currentUser && <Link to="/LoginPage">Login</Link>}
        </div>
      </div>
      <div className="rightSide">
        <Link to="/">Home</Link>
        <Link to="/SelectLevelsPage">Levels</Link>
        <Link to="/UserForm">User Profile</Link>
        <Link to="/Progress">Progress</Link>

        {currentUser && <span>Welcome, {currentUser.email}</span>}
        {currentUser && <Link to="#" onClick={handleSignOut}>Sign Out</Link>}
        {!currentUser && <Link to="/LoginPage">Login</Link>}
      </div>
    </div>
  );
}

export default Navbar;
