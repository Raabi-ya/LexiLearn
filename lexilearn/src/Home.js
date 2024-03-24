import React from "react";
import "./Home.css";
import Footer from "./Footer";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Home() {
  return (
    <div>
    <div className="home">
      <section className="homesection">
        <div className="homeWelcome">
          <h1 className="welcome-msg-home">Welcome to LexiLearn!</h1>
          <h2>Get ready to have fun while becoming a super reader!</h2>
          <h3 className="welcome-msg-home2">Explore our awesome games and activities that make reading easy and exciting for kids.</h3>
          <h3 className="welcome-msg-home2">Let's dive in and discover the magic of stories together!</h3>
          <div className="welcome-img">
            <img src="homeGirl.png" alt="girl"/>
          </div>
          <div className="welcome-img2">
            <img src="homeGame.png" alt="girl"/>
          </div>
          <div className="welcome-img3">
            <img src="homebooks.png" alt="book"/>
          </div>
        </div>
      </section>

      <section className="homesection">
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
      </section>

      <section className="homesection">
      <div className="home-level">
        <h1 className="home-topic">Let's Get Started!</h1>
        <div className='home-sticker'>
          <img src="./homeLevel.png" alt='Sticker'/>
        </div>
        <h3>Pre-test: </h3>
        <p>Begin your learning journey with our pre-test, a quick assessment designed to gauge your current level. We'll suggest a good starting point based on your performance by answering just four questions. While we recommend following our suggestion, you're always free to choose any level that works best for you.</p>
        <h3>Level 1: </h3>
        <p>Dive into the basics with Level 1, where we focus on letter recognition. We'll challenge you to identify letters through image hints while providing score feedback and motivational support.</p>
        <h3>Level 2: </h3>
        <p>Progress to Level 2, where we delve into more intricate letter concepts. Could you test your understanding of tricky letter combinations and patterns?</p>
        <h3>Level 3: </h3>
        <p>Challenge yourself at Level 3, where we explore complete word comprehension. Put your knowledge to the test as we assess your ability to recognize and understand words in context. Embark on your learning adventure today and discover the joy of language mastery with us!</p>
        <h4 className="home-level-click">Click here to start</h4>
        <div className="home-level-button">
        <Link to="/SelectLevelsPage"> {/* Use Link for navigation */}
        <button>levels</button>
        </Link>
        </div>
      </div>
      </section>

      <section className="homesection">
        <div className="home-contactUs">
          <h1 className="home-topic">Get in touch with us...</h1>
          <div className='home-sticker'>
            <Link to="/ContactUs"> {/* Use Link for navigation */}
              <img src="./homeContact.png" alt='Sticker'/>
            </Link>
          </div>
          <p>Feel free to reach out to the development team through email or follow us on social media.</p>
          <div className="home-contact-button">
          <Link to="/ContactUs"> {/* Use Link for navigation */}
          <button>Contact Us via Email</button>
          </Link>
          </div>
        </div>
      </section>

      <section className="homesection">
        <div className="home-aboutUs">
          <h1 className="home-topic">Get to know about us...</h1>
          <div className='home-sticker'>
            <img src="./homeTeam.png" alt='Sticker'/>
          </div>
          <p>Join us on a journey through the development process of this website, where we'll share our story.<a href="/AboutUsPage"> Read more...</a></p>
        </div>
      </section>
      
    </div>
    <div className="homeFooter">< Footer /></div>
    </div>
  );
}

export default Home;
