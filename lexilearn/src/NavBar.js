import React, { useState } from "react";
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
          <a href="/">Home</a>
          <a href="/levels">Levels</a>
          <a href="./UserForm">User Profile</a>
          <a href="./AboutUsPage">About Us</a>
          <a href="./LoginPage">Sign In</a>
          <a href="/contact">Sign Up</a>
        </div>
      </div>
      <div className="rightSide">
        <a href="/">Home</a>
        <a href="/levels">Levels</a>
        <a href="./UserForm">User Profile</a>
        <a href="./AboutUsPage">About Us</a>
        <a href="./LoginPage">Sign In</a>
        <a href="/contact">Sign Up</a>
        <button onClick={toggleNavbar}>Toggle NavBar </button>
  </div>
    </div>
  );
}

export default Navbar;
