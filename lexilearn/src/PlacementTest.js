import React, { useState, useEffect } from 'react';
import './PlacementTest.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const PlacementTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [level, setLevel] = useState('');
  const [answered, setAnswered] = useState(false); // State to track if the question has been answered
  const [backgroundMusicPlaying, setBackgroundMusicPlaying] = useState(true);

  useEffect(() => {
    if (quizCompleted) {
      setBackgroundMusicPlaying(false);
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Well done! you got ${score} out of ${questions.length} right! .`;
      window.speechSynthesis.speak(utterance);
    }
  }, [quizCompleted, score]);

  useEffect(() => {
    if (level !== '') {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Suggested level ${level}.`;
      window.speechSynthesis.speak(utterance);
    }
  }, [level]);

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

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (answered && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
    } else if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true);
      determineLevel();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswered(false);
    }
  };

  const determineLevel = () => {
    if (score <= 2) {
      setLevel('Level 1');
    } else {
      setLevel('Level 2');
    }
  };

  return (
    <div>
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
            <ul className="pre-vertical-options">
              {questions[currentQuestion].options.map((option, index) => (
                <li key={index}>
                  <div className="answer-pretest-button">
                    <button onClick={() => handleAnswer(option)}>{option}</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pretest-next-button">
              <button onClick={prevQuestion} disabled={currentQuestion === 0}>Back ←</button>
              <button onClick={nextQuestion} disabled={!answered}>Next →</button>
            </div>
            
          </div>
        )}

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

