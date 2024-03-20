import React, { useState, useEffect } from 'react';
import './PlacementTest.css';
import {Link} from "react-router-dom";


const PlacementTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [level, setLevel] = useState('');
  const [answered, setAnswered] = useState(false); // State to track if the question has been answered
  const [levelLink,setlevelLink]=useState("/Level1");

  const questions = [
    {
      //question: "Choose the correct Answer!",
      options: ["b e d", "d e b", "d e d",],
      correctAnswer: "b e d",
      imagehint :"bed.png"
    },
    {
      //question: "Choose the correct Answer!",
      options: ["g o d", "b o g", "d o g",],
      correctAnswer: "d o g",
      imagehint :"dog.png"
    },
    {
     // question: "Choose the correct Answer !",
      options: ["b r i d", "b i r d", "d i r b", ],
      correctAnswer: "b i r d",
      imagehint :"Bird.png"
    },
    {
      //question: "Choose the correct Answer!",
      options: ["q u e e n", " p u e e n", " q n e e u", ],
      correctAnswer: "q u e e n",
      imagehint :"queen.png"
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
      setlevelLink('/Level1');
    } else {
      setLevel('Level 2');
      setlevelLink('/Level2');
    }
  };
return (
     <div className='pretest'>
      <audio src={`${process.env.PUBLIC_URL}/pre test backgroud track.mp3`} autoPlay loop />
    <div className ="image-pretest" >
      <img src="./pretest.png" alt='pretest logo'/>
      </div>
      {!quizCompleted && (
        <div className="pre-quiz-container" >
          <h2>Choose the correct Answer!</h2>
          <div className="pre-quiz-image">
            {questions[currentQuestion].imagehint && (
              <img src={questions[currentQuestion].imagehint} alt={`hint for question ${currentQuestion + 1}`} />
            )}
          </div>
          <div className="pre-vertical-options">
            {questions[currentQuestion].options.map((option, index) => (
              <a key={index}>
                <div className="answer-pretest-button">
                  <button onClick={() => handleAnswer(option)}>{option} </button>
                </div>
              </a>
            ))}
          </div>
          <div className="pretest-next-button">
            <button onClick={prevQuestion} disabled={currentQuestion === 0}>Back ← </button>
            <button onClick={nextQuestion} disabled={!answered}>Next →</button>
          </div>
        </div>
      )}

      {quizCompleted && (
        <div className="pre-quiz-quit ">
          <p>Quiz completed! Your score is {score} out of {questions.length}</p>
          <p>Suggested Level: </p>
          <div>
            <Link to={levelLink} ><button>{level} </button></Link>
            
            
           <Link to="/SelectLevelsPage"><button>Select Level</button></Link>
          </div>
        </div>
      )}
    
    </div>
  
  
  );
};

export default PlacementTest;
