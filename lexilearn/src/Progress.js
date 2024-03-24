import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { db, auth } from './firebase';

import './Progress.css';
import {getDoc, doc} from "firebase/firestore";

const Progress = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  
  const [chartKey, setChartKey] = useState(0);
  
  // Function to fetch user data
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
    getUser();
  }, []);


  


// Chart data
const chartData = {
  labels: userData ? userData.level1.map((_, index) => `Attempt ${index + 1}`) : [], 
  labels: ['Score', 'Attempt 1', 'Attempt 2', 'Attempt 3'], 
  datasets: [
    {
      label: 'Level 1',
      data: userData ? userData.level1 : [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Level 2',
      data: userData ? userData.level2 : [],
      fill: false,
      borderColor: 'rgb(192, 75, 192)',
      tension: 0.1
    },
    {
      label: 'Level 3',
      data: userData ? userData.level3 : [],
      fill: false,
      borderColor: 'rgb(192, 192, 75)',
      tension: 0.1
    },
    {
      label: 'Level 4',
      data: userData ? userData.level4 : [],
      fill: false,
      borderColor: 'rgb(75, 75, 192)',
      tension: 0.1
    }
  ]
};

  // JSX for rendering
  return (
    <div className="progress-container">
      <div className="progress-content">
        <h1>{username}</h1>
        
        
        <h2 className="chart-heading">Progress Chart</h2> 
        <div style={{ height: '600px', width: '800px' }}>
          <Line 
            data={chartData} 
            key={chartKey} 
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }}
          />
        </div> 
        
          
         
      </div>
    </div>
  );

};

export default Progress;


