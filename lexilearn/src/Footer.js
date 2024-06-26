import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


function Footer() {
  return (
    //Footer container
    <div className="footer">
      {/*Navigation links to pages */}
      <nav className="footer-navbar">
        <ul className="footer-nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/SelectLevelsPage">Level Page</a></li>
          <li><a href="/AboutUsPage">About Us</a></li>
          <li><a href="/ContactUs">Contact Us</a></li>
        </ul>
      </nav>
      {/*Social media icons */}
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.instagram.com/lexi_learn_?igsh=MWE2eXQ1eDVhZjc5ZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="mailto:youremail@example.com">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
      <div className="policy-link">
        <p>
          <a href="/privacy-policy">Privacy Policy</a>
        </p>
      </div>
      <div className="copyright">
        <p>&copy; 2024 LexiLearn. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
