import React, { useState, useEffect } from 'react';
import './Level4.css';
import Footer from './Footer';
import { getDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from './firebase';
import {Link} from "react-router-dom";

const QuestionBank = [
    {
        text: "I like to eat _________ .",
        image: "grapes.gif",
        correctAnswer: 'grapes',
    },
    {
        text: "There is a _________ flying.",
        image: "butterfly.gif",
        correctAnswer: 'butterfly',
    },
    {
        text: "_________ are flying.",
        image: "bird-fly.gif",
        correctAnswer: 'birds',
    },
    {
        text: "I like to play with my _________ ",
        image: "doll.gif",
        correctAnswer: 'doll',
    },
    {
        text: "_________ is eating.",
        image: "cat-eating.gif",
        correctAnswer: 'cat',
    },
    {
        text: "_________ is running on the railway.",
        image: "train.gif",
        correctAnswer: 'train',
    },
    {
        text: "I have a pink _________ .",
        image: "cap.gif",
        correctAnswer: 'cap',
    },
    {
        text: "_________ is jumping.",
        image: "rabbit.gif",
        correctAnswer: 'rabbit',
    },
    {
        text: "_________ is rulling the country.",
        image: "queen.gif",
        correctAnswer: 'queen',
    },
    {
        text: "I have a red _________.",
        image: "umbrella.gif",
        correctAnswer: 'umbrella',
    },
    {
        text: "_________ is sailing.",
        image: "boat.gif",
        correctAnswer: 'boat',
    },
    {
        text: "I want to drink _________.",
        image: "water.gif",
        correctAnswer: 'water',
    },
    {
        text: "I love to eat _________.",
        image: "watermelon.gif",
        correctAnswer: 'watermelon',
    },
    {
        text: "I saw a huge _________.",
        image: "kite.gif",
        correctAnswer: 'kite',
    },
    {
        text: "I can't find my _________.",
        image: "pen.gif",
        correctAnswer: 'pen',
    },
    {
        text: "_________ is crying.",
        image: "baby-crying.gif",
        correctAnswer: 'baby',
    },
    {
        text: "This is my _________.",
        image: "house.gif",
        correctAnswer: 'house',
    },
    {
        text: "_________ is jumping.",
        image: "frog.gif",
        correctAnswer: 'frog',
    },
    {
        text: "Monkey is eating a _________.",
        image: "monkey-banana.gif",
        correctAnswer: 'banana',
    },
    {
        text: "I have a nice _________.",
        image: "watch.gif",
        correctAnswer: 'watch',
    },
    {
        text: "I like to go to the_________.",
        image: "beach.gif",
        correctAnswer: 'beach',
    },
    {
        text: "I wash my _________.",
        image: "hands.gif",
        correctAnswer: 'hands',
    },
    {
        text: "I can see a _________ in the sky.",
        image: "star.gif",
        correctAnswer: 'star',
    },
];
const Level4Page = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedbackAudio, setFeedbackAudio] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Shuffle the question bank and select 12 random questions
        const shuffledQuestions = shuffleArray(QuestionBank).slice(0, 12);
        setQuestions(shuffledQuestions);
    }, []);

    useEffect(() => {
        if (currentQuestionIndex === questions.length) {
          saveScoreToFirestore();
          let fbAudio;
          if (score === questions.length) {
            fbAudio = './level4-1fb.mp3';
          } else if (score >= questions.length / 2) {
            fbAudio = '/level4-2fb.mp3';
          } else {
            fbAudio = '/level4-3fb.mp3';
          }
    
          // Load feedback audio
          const audio = new Audio(fbAudio);
          setFeedbackAudio(audio);
        }
      }, [currentQuestionIndex, questions.length, score]);
    
      const getUser = async () => {
        const user = auth.currentUser;
        if(user){
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const userData = docSnap.data();
          setUsername(userData.username);
        } else {
         // docSnap.data() will be undefined in this case
         console.log("No such document!");
        }
        
      }
      };
    
      useEffect(() => {
        getUser()
      }, []);
    

    const shuffleArray = array => {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleUserInput = (event) => {
        setUserAnswer(event.target.value);
    };

    const handleNextClick = () => {
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        if (userAnswer.toLowerCase() === correctAnswer || userAnswer.toUpperCase() === correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }
        setUserAnswer('');
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handleBackClick = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    };

    const handleFeedbackAudioClick = () => {
        // If feedback audio exists, play it
        if (feedbackAudio) {
          feedbackAudio.play();
        }
    };

    const saveScoreToFirestore = async () => {
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
            if (data && typeof data.level4_attempt === 'number' && !isNaN(data.level4_attempt)) {
                currentAttempt = data.level4_attempt + 1;
            } else {
                currentAttempt = 1;
            }
        }

        await Promise.all([
            updateDoc(attemptDocRef, { level4_attempt: currentAttempt }),
            setDoc(doc(db, `level4-scores/${user.uid}_${currentAttempt}`), {
                attempt: currentAttempt,
                score: score,
                timeStamp: serverTimestamp(),
            })
        ]);
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    let fbImage;

    if (currentQuestionIndex === questions.length) {
        saveScoreToFirestore();
        let feedback = '';
        if (score === questions.length) {
            feedback = 'Perfect! You answered all questions correctly!';
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
                <div className="l4-game-over-container">
                    <h1>{username},</h1>
                    <h2>Your score: {score} / 12</h2>
                    <h1 className='l4-feedback'>{feedback}</h1>
                    <div className='l4-feedback-img'>
                    <img src={fbImage} alt="FeedbackImage"/>
                    </div>
                    <button className='feedback-button-l4' onClick={handleFeedbackAudioClick}><img src="/speaker.png" alt='speaker'/></button>
                    <Link to="/SelectLevelsPage">
                    <button className='l4-level-selection'>Select Level</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="l4-container">
                <audio src={`${process.env.PUBLIC_URL}/level4-background-track.mp3`} autoPlay loop />
                <img src="./Level 4 logo.png" alt="Level4Logo" className="l4-top-image-small" />
                <h2>Help to fill in the missing word!</h2>
                <div className="l4-image-container">
                    <img src={currentQuestion.image} alt="Question Hint" className="l4-question-image" />
                </div>
                <div className="l4-fill-in-the-blanks">
                    <h1>{currentQuestion.text}</h1>
                </div>
                <div className="l4-input-container">
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={handleUserInput}
                        placeholder="Type your answer here!"
                    />
                </div>
                <div className="l4-button-container">
                    <div className="l4-centered-container">
                        <div className="l4-navigation-buttons">
                            <button onClick={handleBackClick} disabled={currentQuestionIndex === 0} className="l4-navigation-button">
                                ← Back
                            </button>
                            <button onClick={handleNextClick} className="l4-navigation-button">
                                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next → '}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div><Footer /></div>
        </div>
    );
};

export default Level4Page;