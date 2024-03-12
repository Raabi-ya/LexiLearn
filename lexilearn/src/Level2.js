import React, { useState, useEffect } from 'react';
import './Level2.css'
import Footer from './Footer';

const questionsData = [
  { 
    question: '_ o o n',
    options: [
      { value: 'm', label: 'm' },
      { value: 'w', label: 'w' },
    ],
    correctAnswer: 'm',
    hintImage: 'moon.gif'
  },
  {
    question: '_ a b y',
    options: [
      { value: 'b', label: 'b' },
      { value: 'd', label: 'd' },
    ],
    correctAnswer: 'b',
    hintImage: 'baby.gif'
  },
  {
    question: '_ u r s e',
    options: [
      { value: 'u', label: 'u' },
      { value: 'n', label: 'n' },
    ],
    correctAnswer: 'n',
    hintImage: 'nurse.gif'
  },
  {
    question: '_ a t c h',
    options: [
      { value: 'w', label: 'w' },
      { value: 'm', label: 'm' },
    ],
    correctAnswer: 'w',
    hintImage: 'watch.gif'
  },
  {
    question: '_ o l l',
    options: [
      { value: 'd', label: 'd' },
      { value: 'b', label: 'b' },
    ],
    correctAnswer: 'd',
    hintImage: 'doll.gif'
  },
  {
    question: '_ u e e n',
    options: [
      { value: 'p', label: 'p' },
      { value: 'q', label: 'q' },
    ],
    correctAnswer: 'q',
    hintImage: 'queen.gif'
  },
  {
    question: '_ n d e r',
    options: [
      { value: 'n', label: 'n' },
      { value: 'u', label: 'u' },
    ],
    correctAnswer: 'u',
    hintImage: 'under.gif'
  },
  {
    question: '_ a n d a',
    options: [
      { value: 'q', label: 'q' },
      { value: 'p', label: 'p' },
    ],
    correctAnswer: 'p',
    hintImage: 'panda.gif'
  },
  {
    question: '_ o u s e',
    options: [
      { value: 'm', label: 'm' },
      { value: 'w', label: 'w' },
    ],
    correctAnswer: 'm',
    hintImage: 'mouse.gif'
  },
  {
    question: '_ a l k',
    options: [
      { value: 'm', label: 'm' },
      { value: 'w', label: 'w' },
    ],
    correctAnswer: 'w',
    hintImage: 'walk.gif'
  },
  {
    question: '_ e s t',
    options: [
      { value: 'n', label: 'n' },
      { value: 'u', label: 'u' },
    ],
    correctAnswer: 'n',
    hintImage: 'nest.gif'
  },
  {
    question: '_ o o k',
    options: [
      { value: 'b', label: 'b' },
      { value: 'd', label: 'd' },
    ],
    correctAnswer: 'b',
    hintImage: 'book.gif'
  },
  {
    question: '_ r u m',
    options: [
      { value: 'b', label: 'b' },
      { value: 'd', label: 'd' },
    ],
    correctAnswer: 'd',
    hintImage: 'drum.gif'
  },
  {
    question: '_ i z z a',
    options: [
      { value: 'q', label: 'q' },
      { value: 'p', label: 'p' },
    ],
    correctAnswer: 'p',
    hintImage: 'pizza.gif'
  },
  {
    question: '_ u e u e',
    options: [
      { value: 'q', label: 'q' },
      { value: 'p', label: 'p' },
    ],
    correctAnswer: 'q',
    hintImage: 'queue.gif'
  },
  {
    question: '_ o a t',
    options: [
      { value: 'b', label: 'b' },
      { value: 'd', label: 'd' },
    ],
    correctAnswer: 'b',
    hintImage: 'boat.gif'
  },
  {
    question: '_ e b r a',
    options: [
      { value: 's', label: 's' },
      { value: 'z', label: 'z' },
    ],
    correctAnswer: 'z',
    hintImage: 'zebra.gif'
  },
  {
    question: '_ t a r',
    options: [
      { value: 's', label: 's' },
      { value: 'z', label: 'z' },
    ],
    correctAnswer: 's',
    hintImage: 'star.gif'
  },
  {
    question: '_ a n d',
    options: [
      { value: 'z', label: 'z' },
      { value: 's', label: 's' },
    ],
    correctAnswer: 's',
    hintImage: 'sand.gif'
  },
  {
    question: '_ i p p e r',
    options: [
      { value: 'z', label: 'z' },
      { value: 's', label: 's' },
    ],
    correctAnswer: 'z',
    hintImage: 'zipper.gif'
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
      fbImage = './feedback1.gif'
    } else if (score >= questions.length / 2) {
      feedback = 'Good job! You got most of the questions right!';
      fbImage = 'feedback2.gif'
    } else {
      feedback = 'Keep practicing! You can do better!';
      fbImage = './feedback3.gif'
    }
    
    return (
 
      <div className="l2-game-over-container">
        <h2>Score: {score} / 7</h2>
        <h1 className='l2-feedback'>{feedback}</h1>
        <img src={fbImage} alt="FeedbackImage"/>

      </div>
    );
    
  }
  

  return (
    <div className="l2-container">
      <img src="./level2.png" alt="Level2Logo" className="l2-top-image" /> 
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
      <div><Footer/></div>
    </div>
  );
};


export default DropdownPage;
