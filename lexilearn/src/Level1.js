import React, { useState, useEffect } from 'react';
import { getDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import "./Level1.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import { db, auth } from './firebase';

//Question bank
const questions = [
  { question: '__ at', answer: 'c', image: 'cat.png' }, //Test c:cat
  { question: '__ at', answer: 'b', image: 'bat.png' }, //Test b:bat
  { question: 'be __', answer: 'd', image: 'bed.png' }, //Test d:bed
  { question: '__ at', answer: 'h', image: 'hat.png' }, //Test h:hat
  { question: '__ ot', answer: 'p', image: 'pot.png' }, //Test p:pot
  { question: '__ ee', answer: 'b', image: 'bee.png' }, //Test b:bee
  { question: '__ ig', answer: 'p', image: 'pig.png' }, //Test p:pig
  { question: '__ ug', answer: 'm', image: 'mug.png' }, //Test m:mug
  { question: '__ og', answer: 'd', image: 'dog.png' }, //Test d:dog
  { question: 'su __', answer: 'n', image: 'sun.png' }, //Test n:sun
  { question: 'ca __', answer: 'p', image: 'cap.png' }, //Test p:cap
  { question: 'a __ t', answer: 'n', image: 'ant.png'}, //Test n:ant
  { question: 'co __', answer: 'w', image: 'cow.png'},  //Test w:cow
  { question: '__ ox', answer: 'b', image: 'box.png'},  //Test b:box
  { question: '__ ey', answer: 'k', image: 'key.png'},  //Test k:key
  { question: '__ ag', answer: 'b', image: 'bag.png'},  //Test b:bag
  { question: 'fa __', answer: 'n', image: 'fan.png'},  //Test n:fan
  { question: '__ us', answer: 'b', image: 'bus.png'},  //Test b:bus
  { question: 'pe __', answer: 'n', image: 'pen.png'},  //Test n:pen
  { question: 'he __', answer: 'n', image: 'hen.png'},  //Test n:hen
];

//Rendering Level 1
const Level1 = () => {
  // State variables to track the current question, user answers, displayed questions, and score
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(5).fill(''));
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [score, setScore] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  // Function to initialize the displayed questions when the component mounts
  useEffect(() => {
    const selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);
    setDisplayedQuestions(selectedQuestions);
  }, []);

  // Function to handle input change for user answers
  const handleChange = (event) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = event.target.value;
    setUserAnswers(newAnswers);
  };

  //Function to navigate to the previous question
  const handleBack = () => {
    setCurrentQuestion(Math.max(currentQuestion - 1, 0));
  };

  //Function to navigate to the previus question
  const handleNext = () => {
    setCurrentQuestion(Math.min(currentQuestion + 1, displayedQuestions.length - 1));
  };

  //Function to handle the submission of the quiz : calculating the score, saving the score to the database
  const handleSubmit = async () => {
    let totalScore = 0;
    displayedQuestions.forEach((question, index) => {
      if (userAnswers[index]?.toLowerCase() === question.answer) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
    setQuizFinished(true);

    const user = auth.currentUser;
  
    if (!user) {
      console.error("User not authenticated.");
      return;
    }
  
    const attemptDocRef = doc(db, "users", user.uid);
    const attemptDocSnap = await getDoc(attemptDocRef);
  
    let currentAttempt = 1;
    if (attemptDocSnap.exists()) {
      const data = attemptDocSnap.data();
      if (data && typeof data.level1_attempt === 'number' && !isNaN(data.level1_attempt)) {
        currentAttempt = data.level1_attempt + 1;
      } else {
        currentAttempt = 1;
      }
    }
  
    await Promise.all([
      updateDoc(attemptDocRef, { level1_attempt: currentAttempt }),
      setDoc(doc(db, `level1-scores/${user.uid}_${currentAttempt}`), {
        attempt: currentAttempt,
        score: totalScore,
        timeStamp: serverTimestamp(),
      })
    ]);
  };

  const currentDisplayedQuestion = displayedQuestions[currentQuestion];
  const isQuizActive = !quizFinished || currentQuestion < displayedQuestions.length - 1;

  //Rendering the Level1 component
  return (
    <div>
      <div className="level1">
        <div className="level1-instructions">
          <div className='image-level1'>
            <img src="./level1.png" alt='Level 1 logo'/>
          </div>
          <p>Help us fill in the missing letters!</p>
        </div>
        {currentDisplayedQuestion && (
          <div className='question'>
            {currentDisplayedQuestion.image && (
              <div className='question-image'>
                <img src={process.env.PUBLIC_URL + '/level1-img-hints/' + currentDisplayedQuestion.image} alt='Hint' />
              </div>
            )}
            <h2>{currentDisplayedQuestion.question}</h2>
            <input
              type="text"
              value={userAnswers[currentQuestion]}
              onChange={handleChange}
              placeholder="Type the missing letter!"
              disabled={!isQuizActive}
            />
          </div>
        )}
        <div className="navigation-buttons">
          <button onClick={handleBack} disabled={currentQuestion === 0 || !isQuizActive}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          <button onClick={handleNext} disabled={currentQuestion === displayedQuestions.length - 1 || !isQuizActive}>
            Next <FontAwesomeIcon icon={faArrowRight} />
          </button>
          {currentQuestion === displayedQuestions.length - 1 && (
            <button onClick={handleSubmit} disabled={!isQuizActive}>Finish!</button>
          )}
        </div>
        {score !== null && (
          <div className='score-level1'>
            <h3>Your Score: {score}/5</h3>
          </div>
        )}
      </div>
      <div><Footer/></div>
    </div>
  );
};

export default Level1;
