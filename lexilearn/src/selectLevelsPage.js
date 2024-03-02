import React, { useState } from 'react';
import './SelectLevelsPage.css';
import Footer from './Footer';
function SelectLevelsPage() {
  const [SelectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    console.log(`Selected Level ${level}`);
  };

  return (
    <div>
    <div className="Selected-Levels-Page">
      <header className="Selected-Levels-Page-header">
        <div className="content">
          <div className="Level-button">
            <h1>Levels</h1>
            <p>Select Level to Play :</p>
            
            <button onClick={() => handleLevelSelect(1)}>Pre Test</button>
            <button onClick={() => handleLevelSelect(2)}>Level 1</button>
            <button onClick={() => handleLevelSelect(3)}>Level 2</button>
            <button onClick={() => handleLevelSelect(4)}>Level 3</button>
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
    <div>< Footer /></div>
    </div>
  );
}

export default SelectLevelsPage;
