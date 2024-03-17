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
        text: "I like to ride my _________ around the neighborhood.",
        image: "bike.gif",
        correctAnswer: 'bike',
    },
    {
        text: "I can see _________ birds outside my window.",
        image: "bird.gif",
        correctAnswer: 'two',
    },
    {
        text: "The _________ changed its color to blend with the surroundings.",
        image: "chameleon.gif",
        correctAnswer: 'chameleon',
    },
    {
        text: "The long-necked _________ roamed the earth millions of years ago.",
        image: "dinosaur.gif",
        correctAnswer: 'dinosaur',
    },
    {
        text: "I like to play with my toy _________ on the tracks.",
        image: "train.gif",
        correctAnswer: 'train',
    },
    {
        text: "I am going to take a _________ in the pool.",
        image: "splash.gif",
        correctAnswer: 'splash',
    },
    {
        text: "My favorite pet is a fluffy _________.",
        image: "bunny.gif",
        correctAnswer: 'bunny',
    },
    {
        text: "Let's go for a walk by the _________.",
        image: "river.gif",
        correctAnswer: 'river',
    },
    {
        text: "I want to learn about stars and _________ in the sky.",
        image: "astronomy.gif",
        correctAnswer: 'astronomy',
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
        text: "My best _________ is coming over to play today.",
        image: "friend.gif",
        correctAnswer: 'friend',
    },
    {
        text: "I saw a huge _________ flying in the sky.",
        image: "kite.gif",
        correctAnswer: 'kite',
    },
    {
        text: "I can't find my _________ in the garden.",
        image: "shovel.gif",
        correctAnswer: 'shovel',
    },
    {
        text: "Let's build a sandcastle on the _________",
        image: "beach.gif",
        correctAnswer: 'beach',
    },
    {
        text: "I heard a loud _________ in the forest.",
        image: "thunder.gif",
        correctAnswer: 'thunder',
    },
    {
        text: "I like to watch the _________ in the pond.",
        image: "frog.gif",
        correctAnswer: 'frog',
    },
    {
        text: "I can hear the sound of _________ chirping in the trees.",
        image: "cricket.gif",
        correctAnswer: 'crickets',
    },
    {
        text: "I am going to plant some colorful _________ in the garden.",
        image: "flowers.gif",
        correctAnswer: 'flowers',
    },
    {
        text: "I want to build a big _________ out of blocks.",
        image: "castle.gif",
        correctAnswer: 'castle',
    },
    {
        text: "I love to eat crunchy _________ with milk for breakfast.",
        image: "cereal.gif",
        correctAnswer: 'cereal',
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
        if (userAnswer.toLowerCase() === correctAnswer) {
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