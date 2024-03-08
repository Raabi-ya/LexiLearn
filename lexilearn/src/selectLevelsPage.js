import React from 'react';
import { Link } from 'react-router-dom';
import './SelectLevelsPage.css';
import Footer from './Footer';
import Level1 from './Level1'; // Import Level1Page component

function SelectLevelsPage() {
  return (
    <div>
      <div className="Selected-Levels-Page">
        <header className="Selected-Levels-Page-header">
          <div className="content">
            <div className="Level-button">
              <h1>Levels</h1>
              <p>Select Level to Play :</p>
              <div>
                <Link to="/pretest"><button>Pre Test</button></Link>
                <Link to="/Level1"><button>Level 1</button></Link>
                <Link to="/level2"><button>Level 2</button></Link>
                <Link to="/level3"><button>Level 3</button></Link>
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
