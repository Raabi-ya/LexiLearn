import React, { useState, useEffect } from 'react';
import "./Level3.css"
import Footer from './Footer';

const QuestionBank = [
  {
    text: 'Cat is on the ____________',
    blanks: [''],
    answerOptions: ['table', 'chair', 'bed'],
    correctAnswer: 'bed',
    imageUrl:"./cat-bed.gif"
  },
  {
    text: 'Tim is wearing a __________',
    blanks: [''],
    answerOptions: ['hat', 'tap', 'cup'],
    correctAnswer: 'hat',
    imageUrl:"./tim-hat.gif"
  },
  {
    text: 'I have a pet __________',
    blanks: [''],
    answerOptions: ['dot', 'bog', 'dog'],
    correctAnswer: 'dog',
    imageUrl:"./pet-dog.gif"
  },
  {
    text: 'I play the __________',
    blanks: [''],
    answerOptions: ['piano', 'peyano', 'qiano'],
    correctAnswer: 'piano',
    imageUrl:"./play-piano.gif"
  },
  {
    text: 'Max has a red __________',
    blanks: [''],
    answerOptions: ['dag', 'bag', 'baj'],
    correctAnswer: 'bag',
    imageUrl:"./red-bag.gif"
  },
  {
    text: 'Cow eats ___________',
    blanks: [''],
    answerOptions: ['drass', 'grass', 'rass'],
    correctAnswer: 'grass',
    imageUrl:"./cow-grass.gif"
  },
  {
    text: 'Pig loves ___________',
    blanks: [''],
    answerOptions: ['dum', 'mud', 'mad'],
    correctAnswer: 'mud',
    imageUrl:"./pig-mud.gif"
  },
  {
    text: 'kids play with a ___________',
    blanks: [''],
    answerOptions: ['ball', 'dall', 'boll'],
    correctAnswer: 'ball',
    imageUrl:"./play-ball.gif"
  },
  {
    text: ' ___________ swims',
    blanks: [''],
    answerOptions: ['turtle', 'tertul', 'tortal'],
    correctAnswer: 'turtle',
    imageUrl:"./turtle-swims.gif"
  },
  {
    text: ' ___________ sails',
    blanks: [''],
    answerOptions: ['snip', 'sip', 'ship'],
    correctAnswer: 'ship',
    imageUrl:"./ship-sail.gif"
  },
  {
    text: ' ___________ fly',
    blanks: [''],
    answerOptions: ['dribs', 'birds', 'brids'],
    correctAnswer: 'birds',
    imageUrl:"./bird-fly.gif"
  },
  {
    text: ' ___________ shines',
    blanks: [''],
    answerOptions: ['sun', 'sum', 'san'],
    correctAnswer: 'sun',
    imageUrl:"./sun-shine.gif"
  },
  {
    text: 'The ___________ twinkles',
    blanks: [''],
    answerOptions: ['satr', 'star', 'car'],
    correctAnswer: 'star',
    imageUrl:"./stars-twinkle.gif"
  }, 
  {
    text: 'Lucy rides a _______________',
    blanks: [''],
    answerOptions: ['cibycle', 'car', 'bicycle'],
    correctAnswer: 'bicycle',
    imageUrl:"./lucy-bicycle.gif"
  }, 
  {
    text: 'The ___________ is blue',
    blanks: [''],
    answerOptions: ['syk', 'sky', 'sand'],
    correctAnswer: 'sky',
    imageUrl:"./sky-blue.gif"
  }, 
];

const Level3 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  // eslint-disable-next-line
  const [musicVolume, setMusicVolume] = useState(0);

  useEffect(() => {
    const selectQuestions = () => {
      const shuffledQuestions = shuffleArray(QuestionBank).slice(0, 10);
      setQuestions(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setFinished(false);
    };

    selectQuestions();

    // Fade in the music when component mounts
    const fadeDuration = 3000; // 3 seconds
    const fadeInInterval = setInterval(() => {
      setMusicVolume(prevVolume => {
        const newVolume = Math.min(prevVolume + 0.01, 1); // Increase volume gradually
        if (newVolume >= 1) clearInterval(fadeInInterval); // Stop when volume reaches 1
        return newVolume;
      });
    }, fadeDuration / 100); // Adjust the interval to control the speed of fade-in
    return () => clearInterval(fadeInInterval); // Clean up the interval
  }, []);


  

  const shuffleArray = array => {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleDragStart = (e, optionId) => {
    e.dataTransfer.setData('optionId', optionId);
  };

  const handleDrop = (e, questionIndex, blankIndex, optionId) => {
    const currentQuestion = questions[questionIndex];
    if (currentQuestion.correctAnswer === optionId) {
      setScore(prevScore => prevScore + 1);
    }
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].blanks[blankIndex] = optionId; // Change this line
    setQuestions(updatedQuestions);
  };

  const renderQuestion = (question, index) => {
    return (
      <div className="l3-container" key={index}>
        <img src="./level3.png" alt="Level3Logo" className="l3-top-image" />
        <h2 className="l3-mainque">Drag and drop to fill in the blanks!</h2>
        <div>
          {/* Image related to the question */}
          <div className="question-image">
            <img src={question.imageUrl} alt={`Question ${index + 1}`} />
          </div>
          {/* Question text */}
          <div className="l3-question-container">
            <div className="blanks">
              {question.blanks.map((blank, blankIndex) => (
                <div
                  key={blankIndex}
                  className="drop-zone"
                  onDrop={e => handleDrop(e, index, blankIndex, e.dataTransfer.getData('optionId'))} // Change this line
                  onDragOver={e => e.preventDefault()}
                >
                  {blank ? <span>{blank}</span> : null}
                </div>
              ))}
              <div className="question">{question.text}</div>
            </div>
          </div>
          <div className="answer-options">
            {question.answerOptions.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="answer-option"
                draggable
                onDragStart={e => handleDragStart(e, option)}
              >
                <span className="answer-option-text">{option}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const finishQuiz = () => {
    setFinished(true);
  };

  return (
    <div>
      <div className="l3-container">
      <audio src={`${process.env.PUBLIC_URL}/level3-background-track.mp3`} autoPlay loop />
        {questions.length > 0 && (
          <div>
            {renderQuestion(questions[currentQuestionIndex], currentQuestionIndex)}
            {finished && <div>Final Score: {score}/10</div>}
            <div className="l3-buttons">
              <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0 || finished}>
                ← Previous
              </button>
              <button onClick={goToNextQuestion} disabled={currentQuestionIndex === 9 || finished}>
                Next →
              </button>
              {currentQuestionIndex === 9 && (
                <button onClick={finishQuiz}>Finish</button>
              )}
            </div>
          </div>
        )}
      </div>
      <div><Footer /></div>
    </div>
  );
};

export default Level3;