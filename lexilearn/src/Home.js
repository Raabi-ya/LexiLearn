import React from "react";
import "./Home.css";
import Footer from "./Footer";

function Home() {
  return (
    <div>
    <div className="home">
      <div className="headerContainer">
        <div className="homeText">
          <div className="circlemain">
            <b>Web-Based Educational Support Application for Dyslexic Children</b>
          </div>
          <div>
            <span className="circle">Personalized Learning Path</span>
            <span className="circle">Real-time Motivation in Text and Speech</span>
            <span className="circle">Gamified Levels</span>
            <span className="circle">Progress Tracking</span>
          </div>
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
