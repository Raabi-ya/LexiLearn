/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className={`navbar ${openLinks ? "open" : "close"}`}>
      <div className="leftSide">
        <img src="/lexiLearnLogo.png" alt="Logo" />
        <div className="hiddenLinks">
          <Link to="/">Home</Link>
          <Link to="/levels">Levels</Link>
          <Link to="/UserForm">User Profile</Link>
          <Link to="/AboutUsPage">About Us</Link>
          <Link to="/LoginPage">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/">Home</Link>
        <Link to="/levels">Levels</Link>
        <Link to="/UserForm">User Profile</Link>
        <Link to="/AboutUsPage">About Us</Link>
        <Link to="/LoginPage">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <button onClick={toggleNavbar}>Toggle NavBar</button>
      </div>
    </div>
  );
}

export default Navbar;*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
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
          <Link to="/levels">Levels</Link>
          <Link to="/UserForm">User Profile</Link>
          <Link to="/AboutUsPage">About Us</Link>
          <Link to="/LoginPage">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/">Home</Link>
        <Link to="/levels">Levels</Link>
        <Link to="/UserForm">User Profile</Link>
        <Link to="/AboutUsPage">About Us</Link>
        <Link to="/LoginPage">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Navbar;

