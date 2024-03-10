import React, { useState, useEffect } from 'react';
import { getDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import "./Level1.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import { db, auth } from './firebase';

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
        totalScore += 1;
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
      if (data && typeof data.level1_attempt === 'number' && !isNaN(data.level1_attempt)) {
        currentAttempt = data.level1_attempt + 1; // Increment the attempt number
      }
      // Add this condition to handle NaN or missing attempt data
      else {
        currentAttempt = 1;
      }
    }
  
    // Save score and updated attempt number
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
            <h3>Your Score: {score}/5</h3>
          </div>
        )}
      </div>
      <div><Footer/></div>
    </div>
  );
};

export default Level1Page;

