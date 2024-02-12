import React, { useState } from 'react';
import './App.css';

function App() {
  // State to track selected level
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Function to handle level selection
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    // Here you can add logic to navigate to the selected level or load content for that level
    console.log(`Selected Level ${level}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Levels</h1>
        <p>Select Level to Play:</p>
        <LevelButton level={1} onSelect={handleLevelSelect} />
        <LevelButton level={2} onSelect={handleLevelSelect} />
        <LevelButton level={3} onSelect={handleLevelSelect} />
        {/* Add more level buttons as needed */}
      </header>
    </div>
  );
}

// Component for individual level button
const LevelButton = ({ level, onSelect }) => {
  return (
    <button onClick={() => onSelect(level)}>
      Level {level}
    </button>
  );
};

export default App;
