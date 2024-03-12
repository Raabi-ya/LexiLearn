import React, { useState, useEffect } from 'react';
import './App.css'
import level2Image from './level2.png';
import moonImage from './moon.gif';
import babyImage from './baby.gif';
import nurseImage from './nurse.gif';
import watchImage from './watch.gif';
import dollImage from './doll.gif';
import queenImage from './queen.gif';
import underImage from './under.gif';
import pandaImage from './panda.gif';
import mouseImage from './mouse.gif';
import walkImage from './walk.gif';
import nestImage from './nest.gif';
import bookImage from './book.gif';
import drumImage from './drum.gif';
import pizzaImage from './pizza.gif';
import queueImage from './queue.gif';
import boatImage from './boat.gif';
import zebraImage from './zebra.gif';
import starImage from './star.gif';
import sandImage from './sand.gif';
import zipperImage from './zipper.gif';
import gameImage from './game.gif';
import feedbackImage1 from './feedback1.gif';
import feedbackImage2 from './feedback2.gif';
import feedbackImage3 from './feedback3.gif';


const questionsData = [
  { 
    question: '_ o o n',
    options: [
      { value: 'm', label: 'm' },
      { value: 'w', label: 'w' },
    ],
    correctAnswer: 'm',
    hintImage: moonImage
  },
  {
    question: '_ a b y',
    options: [
      { value: 'b', label: 'b' },
      { value: 'd', label: 'd' },
    ],
    correctAnswer: 'b',
    hintImage: babyImage
  },
  {
    question: '_ u r s e',
    options: [
      { value: 'u', label: 'u' },
      { value: 'n', label: 'n' },
    ],
    correctAnswer: 'n',
    hintImage: nurseImage
  },
  {
    question: '_ a t c h',
    options: [
      { value: 'w', label: 'w' },
      { value: 'm', label: 'm' },
    ],
    correctAnswer: 'w',
    hintImage: watchImage
  },
  {
    question: '_ o l l',
    options: [
      { value: 'd', label: 'd' },
      { value: 'b', label: 'b' },
    ],
    correctAnswer: 'd',
    hintImage: dollImage
  },
  {
    question: '_ u e e n',
    options: [
      { value: 'p', label: 'p' },
      { value: 'q', label: 'q' },
    ],
    correctAnswer: 'q',
    hintImage: queenImage
  },
  {
    question: '_ n d e r',
    options: [
      { value: 'n', label: 'n' },
      { value: 'u', label: 'u' },
    ],
    correctAnswer: 'u',
    hintImage: underImage
  },
  {
    question: '_ a n d a',
    options: [
      { value: 'q', label: 'q' },
      { value: 'p', label: 'p' },
    ],
    correctAnswer: 'p',
    hintImage: pandaImage
  },
  {
    question: '_ o u s e',
    options: [
      { value: 'm', label: 'm' },
      { value: 'w', label: 'w' },
    ],
    correctAnswer: 'm',
    hintImage: mouseImage
  },
  {
    question: '_ a l k',
    options: [
      { value: 'm', label: 'm' },
      { value: 'w', label: 'w' },
    ],
    correctAnswer: 'w',
    hintImage: walkImage
  },
  {
    question: '_ e s t',
    options: [
      { value: 'n', label: 'n' },
      { value: 'u', label: 'u' },
    ],
    correctAnswer: 'n',
    hintImage: nestImage
  },
  {
    question: '_ o o k',
    options: [
      { value: 'b', label: 'b' },
      { value: 'd', label: 'd' },
    ],
    correctAnswer: 'b',
    hintImage: bookImage
  },
  {
    question: '_ r u m',
    options: [
      { value: 'b', label: 'b' },
      { value: 'd', label: 'd' },
    ],
    correctAnswer: 'd',
    hintImage: drumImage
  },
  {
    question: '_ i z z a',
    options: [
      { value: 'q', label: 'q' },
      { value: 'p', label: 'p' },
    ],
    correctAnswer: 'p',
    hintImage: pizzaImage
  },
  {
    question: '_ u e u e',
    options: [
      { value: 'q', label: 'q' },
      { value: 'p', label: 'p' },
    ],
    correctAnswer: 'q',
    hintImage: queueImage
  },
  {
    question: '_ o a t',
    options: [
      { value: 'b', label: 'b' },
      { value: 'd', label: 'd' },
    ],
    correctAnswer: 'b',
    hintImage: boatImage
  },
  {
    question: '_ e b r a',
    options: [
      { value: 's', label: 's' },
      { value: 'z', label: 'z' },
    ],
    correctAnswer: 'z',
    hintImage: zebraImage
  },
  {
    question: '_ t a r',
    options: [
      { value: 's', label: 's' },
      { value: 'z', label: 'z' },
    ],
    correctAnswer: 's',
    hintImage: starImage
  },
  {
    question: '_ a n d',
    options: [
      { value: 'z', label: 'z' },
      { value: 's', label: 's' },
    ],
    correctAnswer: 's',
    hintImage: sandImage
  },
  {
    question: '_ i p p e r',
    options: [
      { value: 'z', label: 'z' },
      { value: 's', label: 's' },
    ],
    correctAnswer: 'z',
    hintImage: zipperImage
  },

];

const getRandomQuestions = (questions) => {
  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, 7);
};

const DropdownPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(getRandomQuestions(questionsData));
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleHintClick = () => {
    setShowHint(true);
  };

  const handleNextClick = () => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedOption === correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    setSelectedOption('');
    setShowHint(false);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleBackClick = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };


  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  let fbImage;
  
  if (currentQuestionIndex === questions.length) {
    let feedback = '';
    if (score === questions.length) {
      feedback = 'Perfect! You answered all questions correctly! Move to Level 3!';
      fbImage = feedbackImage3
    } else if (score >= questions.length / 2) {
      feedback = 'Good job! You got most of the questions right!';
      fbImage = feedbackImage2
    } else {
      feedback = 'Keep practicing! You can do better!';
      fbImage = feedbackImage1
    }
    
    return (
 
      <div className="l2-game-over-container">
        <img src={gameImage} alt="game"/>
        <h2>Score: {score} / 7</h2>
        <h1 className='l2-feedback'>{feedback}</h1>
        <img src={fbImage} alt="FeedbackImage"/>

      </div>
    );
    
  }
  

  return (
    <div className="l2-container">
      <img src={level2Image} alt="Level2Logo" className="l2-top-image" /> 
      <div className="l2-fill-in-the-blanks">
      <h2>  Find the missing letter ⌕ </h2>  
      <h1>{currentQuestion.question}</h1>
      </div>
      <div className="l2-dropdown">
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select letter</option>
        {currentQuestion.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </div>
      <div className="l2-button-container">
        <div className="l2-hint-button-container">    
        <button onClick={handleHintClick} className="l2-hint-button">Hint</button>
        {showHint && <img src={currentQuestion.hintImage} alt="Hint"  className="l2-hint-image"/>} 
        </div>
        <div class="l2-centered-container">
        <div className="l2-navigation-buttons">
        <button onClick={handleBackClick} disabled={currentQuestionIndex === 0} className="l2-navigation-button">
        ← Back
        </button>
        <button onClick={handleNextClick} className="l2-navigation-button">
        {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next → '}
        </button>
        </div>
        </div>
      </div>
    </div>
  );
};


export default DropdownPage;
