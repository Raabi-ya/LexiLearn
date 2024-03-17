import React from 'react';
import { Link } from 'react-router-dom';
import './SelectLevelsPage.css';
import Footer from './Footer';

function SelectLevelsPage() {
 

  return (
      <div>
      <div className="Selected-Levels-Page">
        <header className="Selected-Levels-Page-header">
          <div className="content">
          <audio src={`${process.env.PUBLIC_URL}/select-level-background-track.mp3`} autoPlay loop />
            <div className="Level-button">
              <h1>Levels</h1>
              <p>Select Level to Play :</p>
              <div>
                <ul>
                <li><Link to="/pretest"><button className="image1-button">
                <img src="/pretest.png" alt="Level 1" /></button></Link></li>
                <li><Link to="/Level1"><button>Level 1</button></Link></li>
                <li><Link to="/level2"><button>Level 2</button></Link></li>
                <li><Link to="/Level3"><button>Level 3</button></Link></li>
                <li><Link to="/Level4"><button>Level 4</button></Link></li>
                </ul>
            </div>
            </div>
            <div className="image">
              <img src="/climb.png" alt="Climbing" />
            </div>
            <div className="image2">
              <img src="/ladder.png" alt="Ladder" />
  </div>
          </div>
        </header>
      </div>
      <Footer />
    </div>
  );
}


export default SelectLevelsPage;
