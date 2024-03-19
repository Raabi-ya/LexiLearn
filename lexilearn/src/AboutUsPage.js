// AboutUsPage.js
import React from 'react';
import './AboutUs.css';
import Footer from './Footer';

const AboutUsPage = () => {
  return (
    <div>
      {/*Whole page rendering component */}
    <div className="about-us-page">
      <h1>About Us</h1>
      
      <section className="section">
        <h2 className="section-title">Our Story</h2>
        <div className='image-div'>
          <img src="./story.png" alt='Graphic art'/>
        </div>
        <p className="section-paragraph">
          Our story begins with the recognition of the lack of awareness and limited educational support for dyslexic students, leading to high dropout rates and academic challenges. 
          Motivated by the desire to make a positive impact, we developed a personalised, gamified web application to provide much-needed assistance to dyslexic learners.
        </p>
      </section>
      
      <section className="section">
        <h2 className="section-title">Our Team</h2>
        <div className='image-div'>
          <img src="./team.png" alt='Graphic art'/>
        </div>
        <p className="section-paragraph">
          We are a team of enthusiastic computer science undergraduates studying at the Informatics Institute of Technology. 
          Our dedication to this project stems from our academic pursuits, 
          where we aim to address the main obstacle faced by dyslexic children: reading difficulties. 
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Our Mission</h2>
        <div className='image-div'>
          <img src="./mission.png" alt='Graphic art'/>
        </div>
        <p className="section-paragraph">
          Our mission is to address the critical need for personalized assistance for dyslexic children through a web application that provides essential tools and tailored support to meet their unique needs. 
          Our goal is to alleviate the reading challenges encountered by dyslexic learners and foster inclusive education.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Our Values</h2>
        <div className='image-div'>
          <img src="./values.png" alt='Graphic art'/>
        </div>
        <p className="section-paragraph">
          Our values are rooted in the belief that every child deserves equal access to education and opportunities for academic success. 
          We are committed to leveraging technology to create a supportive learning environment that empowers dyslexic students to excel. 
          Our approach emphasizes early awareness of learning differences and the provision of tools to help dyslexic learners thrive academically, echoing the success stories of notable figures like Albert Einstein, Richard Branson and Tom Cruise.
        </p>
      </section>
    </div>
    <div> < Footer /> </div>
    </div>
  );
};

export default AboutUsPage;
