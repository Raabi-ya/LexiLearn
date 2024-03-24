import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { db, auth } from './firebase';
import Chart from 'chart.js/auto';
import './Progress.css';

const Progress = () => {
  const [userData, setUserData] = useState(null);
  const [chartKey, setChartKey] = useState(0); // State to force re-render chart

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      try {
        const level1ScoresRef = await db.collection("level1-scores").doc(user.uid).get();
        const level2ScoresRef = await db.collection("level2-scores").doc(user.uid).get();
        const level3ScoresRef = await db.collection("level3-scores").doc(user.uid).get();
        const level4ScoresRef = await db.collection("level4-scores").doc(user.uid).get();
        
        const userData = {
          level1: level1ScoresRef.exists ? level1ScoresRef.data().scores : [],
          level2: level2ScoresRef.exists ? level2ScoresRef.data().scores : [],
          level3: level3ScoresRef.exists ? level3ScoresRef.data().scores : [],
          level4: level4ScoresRef.exists ? level4ScoresRef.data().scores : [],  
        };

        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Create chart data
  const chartData = {
    labels: userData ? userData.level1.map((_, index) => `Attempt ${index + 1}`) : [], // Dynamically generate attempt labels
    labels: ['Score', 'Attempt 1', 'Attempt 2', 'Attempt 3'], // Example labels
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

  return (
    <div className="progress-container">
      <div className="progress-content">
        <h2 className="chart-heading">Progress Chart</h2> {/* Add class for styling */}
        <div style={{ height: '600px', width: '800px' }}>
          <Line 
            data={chartData} 
            key={chartKey} 
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 5
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

