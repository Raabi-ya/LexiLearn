import React from "react";
import Navbar from "./NavBar";
import "./Home.css";

function Home() {
  return (
    <div>
        <Navbar />
    <div className="home">
      <div className="headerContainer">
        <h1>LexiLearn</h1>
        <p>
          <b>Personalized Web-Based Educational Support Application for Dyslexic Children</b>
        </p>
        <ul>
          <li>Personalized learning path</li>
          <li>Real-time motivation in text and speech</li>
        </ul>
      </div>
    </div>
    </div>
  );
}

export default Home;
