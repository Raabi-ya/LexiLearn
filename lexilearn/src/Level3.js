import React, { useState } from 'react';
import "./Level3.css"

const QuestionBank = [
  {
    text: 'Cat is on the ____________',
    blanks: [''],
    answerOptions: ['table', 'chair', 'bed'],
    correctAnswer: 'bed',
    imageUrl:"./"
  },
  {
    text: 'Tim is wearing a __________',
    blanks: [''],
    answerOptions: ['hat', 'tap', 'cup'],
    correctAnswer: 'hat',
    imageUrl:"./"
  },
  {
    text: 'I have a pet __________',
    blanks: [''],
    answerOptions: ['dot', 'bog', 'dog'],
    correctAnswer: 'dog',
    imageUrl:"./"
  },
  {
    text: 'I play the __________',
    blanks: [''],
    answerOptions: ['piano', 'peyano', 'qiano'],
    correctAnswer: 'piano',
    imageUrl:"./"
  },
  {
    text: 'Helen has a red __________',
    blanks: [''],
    answerOptions: ['dag', 'bag', 'baj'],
    correctAnswer: 'bag',
    imageUrl:"./"
  },
  {
    text: 'Cow eats ___________',
    blanks: [''],
    answerOptions: ['drass', 'grass', 'rass'],
    correctAnswer: 'grass',
    imageUrl:"./"
  },
  {
    text: 'Pig loves ___________',
    blanks: [''],
    answerOptions: ['dum', 'mud', 'mad'],
    correctAnswer: 'mud',
    imageUrl:"./"
  },
  {
    text: 'kid plays with a ___________',
    blanks: [''],
    answerOptions: ['ball', 'dall', 'boll'],
    correctAnswer: 'ball',
    imageUrl:"./"
  },
  {
    text: ' ___________ swims',
    blanks: [''],
    answerOptions: ['turtle', 'tertul', 'tortal'],
    correctAnswer: 'turtle',
    imageUrl:"./"
  },
  {
    text: ' ___________ sails',
    blanks: [''],
    answerOptions: ['snip', 'sip', 'ship'],
    correctAnswer: 'ship',
    imageUrl:"./"
  },
  {
    text: ' ___________ fly',
    blanks: [''],
    answerOptions: ['dribs', 'birds', 'brids'],
    correctAnswer: 'birds',
    imageUrl:"./"
  },
  {
    text: ' ___________ shines',
    blanks: [''],
    answerOptions: ['sun', 'sum', 'san'],
    correctAnswer: 'sun',
    imageUrl:"./"
  },
  {
    text: 'The ___________ twinkles',
    blanks: [''],
    answerOptions: ['satr', 'star', 'car'],
    correctAnswer: 'star',
    imageUrl:"./"
  }, 
  {
    text: 'Lucy rides a _______________',
    blanks: [''],
    answerOptions: ['cibycle', 'car', 'bicycle'],
    correctAnswer: 'bicycle',
    imageUrl:"./"
  }, 
  {
    text: 'The ___________ is blue',
    blanks: [''],
    answerOptions: ['syk', 'sky', 'sand'],
    correctAnswer: 'sky',
    imageUrl:"./"
  }, 
  
];

const Level3 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const selectQuestions = () => {
    const shuffledQuestions = shuffleArray(QuestionBank).slice(0, 10);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setFinished(false);
  };

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
    console.log("Current question: ", currentQuestion);
    console.log("Option ID: ", optionId);
    const droppedOptionId = e.dataTransfer.getData('optionId');
    console.log("Dropped Option ID: ", droppedOptionId);
    if (currentQuestion.correctAnswer === droppedOptionId) {
      setScore(prevScore => prevScore + 1);
    }
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].blanks[blankIndex] = droppedOptionId;
    setQuestions(updatedQuestions);
  };
  

  const renderQuestion = (question, index) => {
    return (
      <div key={index}>
        {/* Image related to the question */}
        <div className="question-image">
          <img src={question.imageUrl} alt={`Question ${index + 1}`} />
        </div>
        {/* Question text */}
        <div className="question">{question.text}</div>
        <div className="blanks">
          {question.blanks.map((blank, blankIndex) => (
            <div
              key={blankIndex}
              className="drop-zone"
              onDrop={e => handleDrop(e, index, blankIndex, question.answerOptions[blankIndex])}
              onDragOver={e => e.preventDefault()}
            >
              {blank ? <span>{blank}</span> : null}
            </div>
          ))}
        </div>
        <div className="answer-options">
          {question.answerOptions.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className="answer-option"
              draggable
              onDragStart={e => handleDragStart(e, option)}
            >
              <span>{option}</span>
            </div>
          ))}
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
      {questions.length === 0 ? (
        <button onClick={selectQuestions}>Start Quiz</button>
      ) : (
        <div>
          {renderQuestion(questions[currentQuestionIndex], currentQuestionIndex)}
          {!finished && <div>Score: {score}/10</div>}
          {finished && <div>Final Score: {score}/10</div>}
          <div>
            <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0 || finished}>
              Previous
            </button>
            <button onClick={goToNextQuestion} disabled={currentQuestionIndex === 9 || finished}>
              Next
            </button>
            {currentQuestionIndex === 9 && (
              <button onClick={finishQuiz}>Finish</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Level3;
