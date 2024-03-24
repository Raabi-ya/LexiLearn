import React, { useState, useEffect } from 'react';
import './PlacementTest.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const PlacementTest = () => {
  // State variables using useState hook
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [level, setLevel] = useState('');
  const [answered, setAnswered] = useState(false); // State to track if the question has been answered
  const [backgroundMusicPlaying, setBackgroundMusicPlaying] = useState(true);

  // Effect hook to handle actions when quiz is completed
  useEffect(() => {
    if (quizCompleted) {
      setBackgroundMusicPlaying(false);
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Well done! you got ${score} out of ${questions.length} right! .`;
      window.speechSynthesis.speak(utterance);
    }
  }, [quizCompleted, score]);

  // Effect hook to announce suggested level
  useEffect(() => {
    if (level !== '') {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Suggested level ${level}.`;
      window.speechSynthesis.speak(utterance);
    }
  }, [level]);

  // Array containing quiz questions
  const questions = [
    {
      options: ["bed", "deb", "ded"],
      correctAnswer: "bed",
      imagehint: "bed.png"
    },
    {
      options: ["god", "bog", "dog"],
      correctAnswer: "dog",
      imagehint: "dog.png"
    },
    {
      options: ["brid", "bird", "dirb"],
      correctAnswer: "bird",
      imagehint: "Bird.png"
    },
    {
      options: ["queen", " pueen", " qneeu"],
      correctAnswer: "queen",
      imagehint: "queen.png"
    }
  ];

  // Function to handle user's answer
  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  // Function to move to the next question
  const nextQuestion = () => {
    if (answered && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
    } else if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true);
      determineLevel();
    }
  };

  // Function to move to the previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswered(false);
    }
  };

  // Function to determine suggested level based on score
  const determineLevel = () => {
    if (score <= 2) {
      setLevel('Level 1');
    } else {
      setLevel('Level 2');
    }
  };

  return (
    <div>
      {/* Placement test container */}
    <div className='placement-test-container'>
    <div className='pretest'>
      <div className="image-pretest">
        <img src="./pretest.png" alt='pretest logo' />
        {!quizCompleted && (
          <div className="pre-quiz-container">
            <audio src={`${process.env.PUBLIC_URL}/pre test backgroud track.mp3`} autoPlay loop />
            <h2>Click on the correct Answer!</h2>
            <div className="pre-quiz-image">
              {questions[currentQuestion].imagehint && (
                <img src={questions[currentQuestion].imagehint} alt={`hint for question ${currentQuestion + 1}`} />
              )}
            </div>
            {/* Display options for the current question */}
            <ul className="pre-vertical-options">
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index}>
                  <div className="answer-pretest-button">
                    <button onClick={() => handleAnswer(option)}>{option}</button>
                  </div>
                </li>
              ))}
            </ul>
            {/* Navigation buttons */}
            <div className="pretest-next-button">
              <button onClick={prevQuestion} disabled={currentQuestion === 0}>Back ←</button>
              <button onClick={nextQuestion} disabled={!answered}>Next →</button>
            </div>
            
          </div>
        )}
        {/* Display quiz completion message */}
        {quizCompleted && (
          <div className="pre-quiz-quit ">
            <div className="gif-pretest">
              <img src="/pretest.gif" alt='pretest gif' />
            </div>
            <p>Well done! You got {score} out of {questions.length} right! </p>
            <p> Suggested Level: {level} </p>
            <div>
              <Link to='/SelectLevelsPage'>
              <button>Select Level</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    <div className='footer-containing-div'><Footer /></div>
    </div>
  );
};

export default PlacementTest;

