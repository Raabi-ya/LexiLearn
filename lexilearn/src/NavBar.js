import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const handleSignOut = () => {
    // Implement sign-out logic here
    // For example, clearing session/local storage, updating state, etc.
  };

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
          <Link to="/AboutUsPage">About Us</Link>
          <Link to="/LoginPage">Sign In</Link>
          <Link to="/Signup">Sign Up</Link>
          <Link to={handleSignOut}>Sign Out</Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/">Home</Link>
        <Link to="/SelectLevelsPage">Levels</Link>
        <Link to="/UserForm">User Profile</Link>
        <Link to="/AboutUsPage">About Us</Link>
        <Link to="/LoginPage">Sign In</Link>
        <Link to="/Signup">Sign Up</Link>
        <Link to={handleSignOut}>Sign Out</Link>
      </div>
    </div>
  );
}

export default Navbar;


