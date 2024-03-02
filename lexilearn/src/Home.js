import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
        <div className="homeText">
          <h1>LexiLearn</h1>
          <p>
            <b>Personalized Web-Based Educational Support Application for Dyslexic Children</b>
          </p>
          <ul>
            <li>Personalized learning path</li>
            <li>Real-time motivation in text and speech</li>
            <li>Gamified levels</li>
            <li>Reading alphabets</li>
            <li>Progress tracking</li>
          </ul>
        </div>
        <div className="homeImageContainer">
            <img src="home1.jpg" alt="child" />
        </div>
      </div>
    </div>
  );
}

export default Home;
