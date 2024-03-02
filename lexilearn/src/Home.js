import React from "react";
import "./Home.css";
import Footer from "./Footer";

function Home() {
  return (
    <div>
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
            <img src="HomePageImage.png" alt="child" />
        </div>
      </div>
      
    </div>
    <div>< Footer /></div>
    </div>
  );
}

export default Home;
