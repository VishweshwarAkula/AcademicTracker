import React, { useState, useEffect } from 'react';

function App() {
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    // Function to fetch the latest attendance data from the backend
    const fetchData = () => {
      fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(data => {
          setAttendanceData(data.attendance);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    };

    // Fetch data once when the component mounts
    fetchData();

    // Set up polling every 5 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);  // Empty dependency array ensures this effect runs once when the component mounts

  const renderAttendancePercentage = (subject) => {
    if (attendanceData && attendanceData[subject] !== undefined) {
      return attendanceData[subject].toFixed(2);
    }
    return 'N/A';
  };

  if (!attendanceData) {
    return <div>Loading attendance data...</div>;
  }

  return (
    <div className="App">
      <h1>Attendance Tracker</h1>
      <div>
        {Object.keys(attendanceData).map((subject) => (
          <div key={subject}>
            <h3>{subject}</h3>
            <p>Attendance Percentage: {renderAttendancePercentage(subject)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
