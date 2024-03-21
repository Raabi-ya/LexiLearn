import React, { useState, useEffect } from 'react';
import './PlacementTest.css';
import Footer from './Footer';

const PlacementTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [level, setLevel] = useState('');
  const [answered, setAnswered] = useState(false); // State to track if the question has been answered
  const [levelLink, setLevelLink] = useState("/Level1");
  const [backgroundMusicPlaying, setBackgroundMusicPlaying] = useState(true);

  useEffect(() => {
    if (quizCompleted) {
      setBackgroundMusicPlaying(false);
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Quiz done! you got ${score} out of ${questions.length} right! .`;
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
      options: ["b e d", "d e b", "d e d"],
      correctAnswer: "b e d",
      imagehint: "bed.png"
    },
    {
      options: ["g o d", "b o g", "d o g"],
      correctAnswer: "d o g",
      imagehint: "dog.png"
    },
    {
      options: ["b r i d", "b i r d", "d i r b"],
      correctAnswer: "b i r d",
      imagehint: "Bird.png"
    },
    {
      options: ["q u e e n", " p u e e n", " q n e e u"],
      correctAnswer: "q u e e n",
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
    <div className='pretest'>
      <div className="image-pretest">
        <img src="./pretest.png" alt='pretest logo' />
        {!quizCompleted && (
          <div className="pre-quiz-container">
            <audio src={`${process.env.PUBLIC_URL}/pre test backgroud track.mp3`} autoPlay loop />
            <h2>Choose the correct Answer!</h2>
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
            <p>Quiz done! You got {score} out of {questions.length} right! </p>
            <p> Suggested Level: </p>
            <div>
              <button>{level}</button>
              <button>Select Level</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PlacementTest;

