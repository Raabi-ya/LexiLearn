import React, { useState, useEffect } from 'react';
import { getDoc,doc, serverTimestamp, setDoc,updateDoc } from "firebase/firestore";
import "./Level1.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import { db, auth } from './firebase';

const questions = [
  { question: '__ at', answer: 'c', image: 'cat.png' },
  { question: '__ at', answer: 'b', image: 'bat.png' },
  { question: 'be __', answer: 'd', image: 'bed.png' },
  { question: '__ at', answer: 'h', image: 'hat.png' },
  { question: '__ ot', answer: 'p', image: 'pot.png' },
  { question: '__ ee', answer: 'b', image: 'bee.png' },
  { question: '__ ig', answer: 'p', image: 'pig.png' },
  { question: '__ ug', answer: 'm', image: 'mug.png' },
  { question: '__ og', answer: 'd', image: 'dog.png' },
  { question: 'su __', answer: 'n', image: 'sun.png' },
  { question: 'ca __', answer: 'p', image: 'cap.png' },
  { question: 'a __ t', answer: 'n', image: 'ant.png'},  
  { question: 'co __', answer: 'w', image: 'cow.png'},  
  { question: '__ ox', answer: 'b', image: 'box.png'},  
  { question: '__ ey', answer: 'k', image: 'key.png'},  
  { question: '__ ag', answer: 'b', image: 'bag.png'},  
  { question: 'fa __', answer: 'n', image: 'fan.png'},  
  { question: '__ us', answer: 'b', image: 'bus.png'},  
  { question: 'pe __', answer: 'n', image: 'pen.png'},  
  { question: 'he __', answer: 'n', image: 'hen.png'},  
];

const Level1Page = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(5).fill(''));
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [score, setScore] = useState(null);


  useEffect(() => {
    const selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);
    setDisplayedQuestions(selectedQuestions);
  }, []);

  const handleChange = (event) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = event.target.value;
    setUserAnswers(newAnswers);
  };

  const handleBack = () => {
    setCurrentQuestion(Math.max(currentQuestion - 1, 0));
  };

  const handleNext = () => {
    setCurrentQuestion(Math.min(currentQuestion + 1, displayedQuestions.length - 1));
  };

  const handleSubmit = async () => {
    let totalScore = 0;
    displayedQuestions.forEach((question, index) => {
      if (userAnswers[index]?.toLowerCase() === question.answer) {
        totalScore += 2;
      }
    });
    setScore(totalScore);
    const user = auth.currentUser;
  
    // Ensure user is authenticated
    if (!user) {
      console.error("User not authenticated.");
      return;
    }
  
    // Fetch current attempt number
    const attemptDocRef = doc(db, "users", user.uid);
    const attemptDocSnap = await getDoc(attemptDocRef);
  
    let currentAttempt = 1;
    if (attemptDocSnap.exists()) {
      const data = attemptDocSnap.data();
      if (data && typeof data.attempt === 'number') {
        currentAttempt = data.attempt + 1; // Increment the attempt number
      }
    }
  
    // Save score and updated attempt number
    await Promise.all([
      updateDoc(attemptDocRef, { attempt: currentAttempt }),
      setDoc(doc(db, `level1-scores/${user.uid}_${currentAttempt}`), {
        attempt: currentAttempt,
        score: totalScore,
        timeStamp: serverTimestamp(),
      })
    ]);
  };
  
  
  const currentDisplayedQuestion = displayedQuestions[currentQuestion];

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
            />
          </div>
        )}
        <div className="navigation-buttons">
          <button onClick={handleBack} disabled={currentQuestion === 0}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          <button onClick={handleNext} disabled={currentQuestion === displayedQuestions.length - 1}>
            Next <FontAwesomeIcon icon={faArrowRight} />
          </button>
          {currentQuestion === displayedQuestions.length - 1 && (
            <button onClick={handleSubmit}>Finish!</button>
          )}
        </div>
        {score !== null && (
          <div className='score-level1'>
            <h3>Your Score: {score}/10</h3>
          </div>
        )}
      </div>
      <div><Footer/></div>
    </div>
  );
};

export default Level1Page;

