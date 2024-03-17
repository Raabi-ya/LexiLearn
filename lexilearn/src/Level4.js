import React, { useState, useEffect } from 'react';
import './Level4.css';
import Footer from './Footer';
import { getDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from './firebase';

const QuestionBank = [
    {
        text: "There were a lot of _________ on the branch.",
        image: "https://i.pinimg.com/originals/c2/ea/ce/c2eace5d77c3231f18bef706606ebd8f.gif",
        correctAnswer: 'grapes',
    },
    {
        text: "Look! Up in the sky! It's a bird, it's a plane, no, it's a _________.",
        image: "https://i.pinimg.com/originals/d5/0a/b1/d50ab17486f6b16899ea70898e858105.gif",
        correctAnswer: 'butterfly',
    },
    {
        text: "Every morning, I wake up to the cheerful chirping of a _________ outside my window.",
        image: "https://cdn.pixabay.com/animation/2023/01/16/09/19/09-19-03-257_512.gif",
        correctAnswer: 'bird',
    },
    {
        text: "The _________ changed its color to blend with the surroundings.",
        image: "https://cdn.dribbble.com/users/555720/screenshots/6395932/dr.gif",
        correctAnswer: 'chameleon',
    },
    {
        text: "The _________ roamed the earth millions of years ago.",
        image: "https://i.pinimg.com/originals/3c/87/8e/3c878e909da089ea091b537854a8ac3d.gif",
        correctAnswer: 'dinosaurs',
    },
    {
        text: "I like to play with my toy _________ on the tracks.",
        image: "https://i.pinimg.com/originals/83/88/c9/8388c9a03a4700d66c5eaa0dd24063e1.gif",
        correctAnswer: 'train',
    },
    {
        text: "The water will _________ if I jump on the puddle.",
        image: "https://i.pinimg.com/originals/65/9b/fd/659bfda6513a67a12ff9adc8b1b371c9.gif",
        correctAnswer: 'splash',
    },
    {
        text: "My favorite pet to have is a fluffy _________.",
        image: "https://i.pinimg.com/originals/85/ea/03/85ea03871e20873c3f4318201fefdd33.gif",
        correctAnswer: 'bunny',
    },
    {
        text: "Let's go for a walk by the _________.",
        image: "https://i.pinimg.com/originals/5f/87/96/5f8796516ba9cf7a65728943f4daf058.gif",
        correctAnswer: 'park',
    },
    {
        text: "If it is raining I should always carry an _________.",
        image: "https://i.pinimg.com/originals/42/c1/81/42c181123d09cee442d5b594e7ba396c.gif",
        correctAnswer: 'umbrella',
    },
    {
        text: "I love to play with my toy _________ in the bathtub.",
        image: "boat.gif",
        correctAnswer: 'boat',
    },
    {
        text: "The weather is hot, so I want to drink _________.",
        image: "water.gif",
        correctAnswer: 'water',
    },
    {
        text: "I love to eat the fruit known as _________.",
        image: "https://cdn.dribbble.com/users/2111878/screenshots/4303016/fruits_watermelon.gif",
        correctAnswer: 'watermelon',
    },
    {
        text: "I saw a huge _________ flying in the sky.",
        image: "https://3.bp.blogspot.com/-Sw8XqUxOGok/WkaNYLLodYI/AAAAAAAAHmo/4wJ_0c0IbAoOwYS3GssA_FA0aKUjMvj_wCLcBGAs/s1600/unnamed.gif",
        correctAnswer: 'kite',
    },
    {
        text: "I can't find my blue _________ in the garden.",
        image: "https://media.tenor.com/QUWmzlGbxlAAAAAM/planinarenje-hiking.gif",
        correctAnswer: 'shovel',
    },
    {
        text: "I saw the tall _________ reach for the yummy leaves from the tree.",
        image: "https://i.pinimg.com/originals/4a/8a/59/4a8a59fc2f1ba3a5bf7a3568e6e0f407.gif",
        correctAnswer: 'giraffe',
    },
    {
        text: "I heard a loud _________ in the forest.",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/a444f336714977.573119858ca7f.gif",
        correctAnswer: 'thunder',
    },
    {
        text: "I like to watch the _________ jump.",
        image: "https://i.pinimg.com/originals/19/85/c7/1985c729dd6a7c77382e9a58021e4566.gif",
        correctAnswer: 'frog',
    },
    {
        text: "I saw a monkey eating a _________.",
        image: "https://static.vecteezy.com/system/resources/previews/000/367/742/non_2x/vector-little-monkey-eating-banana.jpg",
        correctAnswer: 'banana',
    },
    {
        text: "I am going to plant some colorful _________ in the garden.",
        image: "https://cdn.dribbble.com/users/786639/screenshots/3471316/dribbble.gif",
        correctAnswer: 'flowers',
    },
    {
        text: "I want to build a big sand_________ in the beach.",
        image: "https://cdn.dribbble.com/users/16431/screenshots/2192341/media/43a95825a3b911a3f7ddfc7f2193e09b.gif",
        correctAnswer: 'castle',
    },
    {
        text: "I _________ my hands with water before and after eating.",
        image: "https://irp-cdn.multiscreensite.com/044cd2e6/dms3rep/multi/gif-01.gif",
        correctAnswer: 'hands',
    },
    {
        text: "I saw a bright shooting _________ in the night sky.",
        image: "star.gif",
        correctAnswer: 'star',
    },
];
const Level4Page = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Shuffle the question bank and select 12 random questions
        const shuffledQuestions = shuffleArray(QuestionBank).slice(0, 12);
        setQuestions(shuffledQuestions);
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

    if (currentQuestionIndex === questions.length) {
        saveScoreToFirestore();
        let feedback = '';
        if (score === questions.length) {
            feedback = 'Perfect! You answered all questions correctly!';
        } else if (score >= questions.length / 2) {
            feedback = 'Good job! You got most of the questions right!';
        } else {
            feedback = 'Keep practicing! You can do better!';
        }

        return (
            <div>
                <div className="l4-game-over-container">
                    <h2>Score: {score} / {questions.length}</h2>
                    <h1 className="l4-feedback">{feedback}</h1>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="l4-container">
                <audio src={`${process.env.PUBLIC_URL}/level4-background-track.mp3`} autoPlay loop />
                <img src="./Level 4 logo.png" alt="Level4Logo" className="l4-top-image-small" />
                <div className="l4-image-container">
                    <img src={currentQuestion.image} alt="Question Image" className="l4-question-image" />
                </div>
                <div className="l4-fill-in-the-blanks">
                    <h1>{currentQuestion.text}</h1>
                </div>
                <div className="l4-input-container">
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={handleUserInput}
                        placeholder="Type your answer here"
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