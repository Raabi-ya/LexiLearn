import React, { useState } from 'react';
import "./Level1.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Level1Page = () => {
  const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1); // Track the current question

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = () => {
    // Call your score calculation function here
    // For now, let's just log the answer
    console.log(`Submitted answer: ${answer}`);
  };

  return (
    <div>
      <div className="level1">
        <div className="level1-instructions">
          <div className='image-level1'>
            <img src="./level-1.png" alt='Level 1 icon'/>
          </div>
          <h1>Welcome to the Level 1 Quiz!</h1>
          <p>Let's fill in the missing letters!</p>
        </div>
        <div className='question'>
          <div className='image-hint'>
            <img src='#' alt='Image hint'/>
          </div>
          <h2> c_t</h2>
          <input
            type="text"
            value={answer}
            onChange={handleChange}
            placeholder="Type the missing letter!"
          />
        </div>
        <div className="navigation-buttons">
          <button onClick={handleBack} disabled={currentQuestion === 1}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          <button onClick={handleNext}> Next
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button onClick={handleSubmit}> Finish! </button>
        </div>
      </div>
    </div>
  );
};

export default Level1Page;



