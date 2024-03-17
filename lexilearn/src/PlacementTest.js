import React, { useState } from 'react';
import './PlacementTest.css';
import Footer from'./Footer';

const PlacementTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [level, setLevel] = useState('');
  const [answered, setAnswered] = useState(false); // State to track if the question has been answered

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
    setAnswered(true); // Mark the question as answered
  };

  const nextQuestion = () => {
    if (answered && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false); // Reset answered status for the next question
    } else if (currentQuestion === questions.length - 1) {
      // Quiz completed
      setQuizCompleted(true);
      determineLevel();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswered(false); // Reset answered status when going back to the previous question
    }
  };

  const determineLevel = () => {
    if (score <= 2) {
      setLevel('Level 1');
    } else {
      setLevel('Level 2');
    }
  };

  /*const quitQuiz = () => {
    alert(`Quiz terminated. Your score is ${score} out of ${questions.length}`);*/
    // You may choose to reset the quiz or redirect the user to another page
  /*};*/

  return (
    <div>
    <div className='pretest'>
    <div className ="image-pretest" >
      <img src="./pretest.png" alt='pretest logo'/>
      {!quizCompleted && (
        <div className="pre-quiz-container" >
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
                  <button onClick={() => handleAnswer(option)}>{option} </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="pretest-next-button">
            <button onClick={prevQuestion} disabled={currentQuestion === 0}>Back ← </button>
            <button onClick={nextQuestion} disabled={!answered}>Next →</button>
          </div>
        </div>
      )}

      {quizCompleted && (
        <div className="quiz-quit ">
          <p>Quiz completed! Your score is {score} out of {questions.length}</p>
          <p>Suggested Level: </p>
          <div>
            <button>{level} </button>
            <button>Select Level</button>
          </div>
        </div>
      )}
    </div>
    </div>
    <div><Footer /></div>
    </div>
  );
};

export default PlacementTest;
