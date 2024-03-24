import React, { useState, useEffect } from 'react';
import { getDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import "./Level1.css";
import Footer from './Footer';
import { db, auth } from './firebase';
import {Link} from "react-router-dom";

//Question bank
const Questions = [
  { question: '__ at', answer: 'c', image: 'cat.gif' }, //Test c:cat
  { question: '__ at', answer: 'b', image: 'bat.gif' }, //Test b:bat
  { question: 'be __', answer: 'd', image: 'bed.gif' }, //Test d:bed
  { question: '__ at', answer: 'h', image: 'hat.gif' }, //Test h:hat
  { question: '__ ot', answer: 'p', image: 'pot.gif' }, //Test p:pot
  { question: '__ ee', answer: 'b', image: 'bee.gif' }, //Test b:bee
  { question: '__ ig', answer: 'p', image: 'pig.gif' }, //Test p:pig
  { question: '__ ug', answer: 'm', image: 'mug.gif' }, //Test m:mug
  { question: '__ og', answer: 'd', image: 'dog.gif' }, //Test d:dog
  { question: 'su __', answer: 'n', image: 'sun.gif' }, //Test n:sun
  { question: 'ca __', answer: 'p', image: 'cap.gif' }, //Test p:cap
  { question: 'a __ t', answer: 'n', image: 'ant.gif'}, //Test n:ant
  { question: 'co __', answer: 'w', image: 'cow.gif'},  //Test w:cow
  { question: '__ ox', answer: 'b', image: 'box.gif'},  //Test b:box
  { question: '__ ey', answer: 'k', image: 'key.gif'},  //Test k:key
  { question: '__ ag', answer: 'b', image: 'bag.gif'},  //Test b:bag
  { question: 'fa __', answer: 'n', image: 'fan.gif'},  //Test n:fan
  { question: '__ us', answer: 'b', image: 'bus.gif'},  //Test b:bus
  { question: 'pe __', answer: 'n', image: 'pen.gif'},  //Test n:pen
  { question: 'he __', answer: 'n', image: 'hen.gif'},  //Test n:hen
];

//Level1 component
const Level1Page = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedbackAudio, setFeedbackAudio] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
      // Shuffle the question bank and select 12 random questions
      const shuffledQuestions = shuffleArray(Questions).slice(0, 5);
      setQuestions(shuffledQuestions);
  }, []);

  useEffect(() => {
      if (currentQuestionIndex === questions.length) {
          saveScoreToFirestore();
          let fbAudio;
          if (score === questions.length) {
              fbAudio = './level1-1fb.mp3';
          } else if (score >= questions.length / 2) {
              fbAudio = '/level1-2fb.mp3';
          } else {
              fbAudio = '/level1-3fb.mp3';
          }

          // Load feedback audio
          const audio = new Audio(fbAudio);
          setFeedbackAudio(audio);
      }
  }, [currentQuestionIndex, questions.length, score]);

  const getUser = async () => {
      const user = auth.currentUser;
      if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              const userData = docSnap.data();
              setUsername(userData.username);
          } else {
              console.log("No such document!");
          }
      }
  };

  useEffect(() => {
      getUser()
  }, []);

  const shuffleArray = array => {
      /* Fisher-Yates shuffle algorithm : Knuth shuffle
      /* It shuffles the elements of an array in place, meaning it modifies the original array rather than creating a new one.
      how the function works: it takes an array as input and iterates over the array in reverse order, 
      starting from the last element (index array.length - 1) and going backward until the first element (index 0). 
      For each element at index i, it generates a random index j such that j is between 0 (inclusive) and i + 1 (exclusive). 
      It then swaps the elements at indices i and j. This is done by using array destructuring assignment, which allows swapping two elements without needing a temporary variable. 
      It continues this process until it has iterated through all elements of the array. Finally, it returns the shuffled array. The Fisher-Yates shuffle algorithm ensures that every permutation of the array has an equal probability of occurring, making it an efficient and unbiased way to shuffle arrays.
      */
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  };

  //Handling the user input
  const handleUserInput = (event) => {
      setUserAnswer(event.target.value);
  };

  //Handling the next click
  const handleNextClick = () => {
    const correctAnswer = questions[currentQuestionIndex].answer; // Use 'answer' property
    if (userAnswer.toLowerCase() === correctAnswer || userAnswer.toUpperCase() === correctAnswer) {
        setScore(prevScore => prevScore + 1);
    }
    setUserAnswer('');
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
};

  //Handling the back click
  const handleBackClick = () => {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  // Feedback audio button click
  const handleFeedbackAudioClick = () => {
      // If feedback audio exists, play it
      if (feedbackAudio) {
          feedbackAudio.play();
      }
  };
  //Saving the score to firestore database:level1-scores
  const saveScoreToFirestore = async () => {
      const user = auth.currentUser;

      if (!user) {
          console.error("User not authenticated.");
          return;
      }

      const attemptDocRef = doc(db, "users", user.uid);
      const attemptDocSnap = await getDoc(attemptDocRef);

      let currentAttempt = 0;
      if (attemptDocSnap.exists()) {
          const data = attemptDocSnap.data();
          if (data && typeof data.level1_attempt === 'number' && !isNaN(data.level1_attempt)) {
              currentAttempt = data.level1_attempt + 1;
          } else {
              currentAttempt = 0;
          }
      }

      await Promise.all([
          updateDoc(attemptDocRef, { level1_attempt: currentAttempt }),
          setDoc(doc(db, `level1-scores/${user.uid}_${currentAttempt}`), {
              attempt: currentAttempt,
              score: score,
              timeStamp: serverTimestamp(),
          })
      ]);
  };

  if (questions.length === 0) {
      return <div>Loading...</div>;
  }
  //Feedbcak rendering function after finishing the quiz
  const currentQuestion = questions[currentQuestionIndex];
  let fbImage;

  if (currentQuestionIndex === questions.length) {
      saveScoreToFirestore();
      let feedback = '';
      if (score === questions.length) {
          feedback = 'Perfect! You answered all questions correctly! Move to Level 2';
          fbImage = './feedback1.gif'
      } else if (score >= questions.length / 2) {
          feedback = 'Good job! You got most of the questions right!';
          fbImage = './feedback2.gif'
      } else {
          feedback = 'Keep practicing! You can do better!';
          fbImage = './feedback3.gif'
      }

      return (
          <div>
            {/*Feedback rendering div*/}
              <div className="l1-game-over-container">
                  <h1>{username},</h1>
                  <h2>Your score: {score} / 5</h2>
                  <h1 className='l1-feedback'>{feedback}</h1>
                  <div className='l1-feedback-img'>
                      <img src={fbImage} alt="FeedbackImage" />
                  </div>
                  <button className='feedback-button-l1' onClick={handleFeedbackAudioClick}><img src="/speaker.png" alt='speaker' /></button>
                  <Link to="/SelectLevelsPage">
                  <button className='l1-level-selection'>Select Level</button>
                  </Link>
                  <Link to="/Level2">
                  <button className='l2-level-selection2'>Level 2</button>
                  </Link>
              </div>
          </div>
      );
  }

  return (
      <div>
        {/* Quiz rendering div */}
          <div className="l1-container">
              <audio src={`${process.env.PUBLIC_URL}/level1-background-track.mp3`} autoPlay loop />
              <img src="./level1.png" alt="Level 1 Logo" className="l1-top-image-small" />
              <h2>Help to fill in the missing letters!</h2>
              <div className="l1-image-container">
                  <img src={currentQuestion.image} alt="Question Hint" className="l1-question-image" />
              </div>
              <div className="l1-fill-in-the-blanks">
                  <h1>{currentQuestion.question}</h1>
              </div>
              <div className="l1-input-container">
                  <input
                      type="text"
                      value={userAnswer}
                      onChange={handleUserInput}
                      placeholder="Type your answer here!"
                  />
              </div>
              <div className="l1-button-container">
                  <div className="l1-centered-container">
                      <div className="l1-navigation-buttons">
                          <button onClick={handleBackClick} disabled={currentQuestionIndex === 0} className="l1-navigation-button">
                              ← Back
                          </button>
                          <button onClick={handleNextClick} className="l1-navigation-button">
                              {currentQuestionIndex === questions.length - 1 ? 'Finish!' : 'Next → '}
                          </button>
                      </div>
                  </div>
              </div>
          </div>
          <div><Footer/></div>
        </div>
    );
};

export default Level1Page;
