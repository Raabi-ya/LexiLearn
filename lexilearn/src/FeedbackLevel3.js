import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from './firebase';
import "./FeedbackLevel3.css";

const FeedbackLevel3 = () => {
  const [lastScore, setLastScore] = useState(null);
  const [scores, setScores] = useState([]);
  const [username, setUsername] = useState("");
  const [feedback, setFeedback] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  useEffect(() => {
    // Retrieve scores from session storage when component mounts
    const sessionScores = JSON.parse(sessionStorage.getItem('level3Scores')) || [];
    if (sessionScores.length > 0) {
      // Set the last score if scores array is not empty
      setScores(sessionScores);
      setLastScore(sessionScores[sessionScores.length - 1]);
      const { feedback, imageSrc, audioSrc } = generateFeedback(sessionScores[sessionScores.length - 1]);
      setFeedback(feedback);
      setImageSrc(imageSrc);
      setAudioSrc(audioSrc);
    }
  }, [scores]); // Run effect whenever scores state changes

  useEffect(() => {
    getUser();
  }, []);

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

  //Generate the feedback
  const generateFeedback = score => {
    let feedback = "";
    let imageSrc = "";
    let audioSrc = "";

    if (score === 10) {
      feedback = "Perfect! You answered all questions correctly! Move to Level 4!";
      imageSrc = "./feedback1.gif";
      audioSrc = "./level3-1fb.mp3";
    } else if (score >= 5) {
      feedback = "Good job! You got most of the questions right!";
      imageSrc = "./feedback2.gif";
      audioSrc = "./level2-2fb.mp3";
    } else {
      feedback = "Keep practicing! You can do better!";
      imageSrc = "./feedback3.gif";
      audioSrc = "./level1-3fb.mp3";
    }

    return { feedback, imageSrc, audioSrc };
  };

  //Handle the audio
  const handlePlayAudio = () => {
    setShowAudioPlayer(true);
  };

  return (
    <div className='l3-feedback'>
      <h1>{username},</h1>
      {lastScore !== null ? (
        <div>
          <h2>Your Score: {lastScore}/10</h2>
          <div className='l3-fb-img'>
          <h1>{feedback}</h1>
          {imageSrc && <img src={imageSrc} alt="Feedback Image" />}
          </div>
          <button className='l3-audio-button' onClick={handlePlayAudio}><img src="/speaker.png" alt='speaker' /></button>
          {showAudioPlayer && audioSrc && <audio src={audioSrc} autoPlay />}
        </div>
      ) : (
        <p>No scores available</p>
      )}
      <Link to='/SelectLevelsPage'>
        <button className='l3-level-selection'>Select Level</button>
      </Link>
      <Link to='/Level4'>
        <button className='l3-level-selection2'>Level 4</button>
      </Link>
    </div>
  );
};

export default FeedbackLevel3;


