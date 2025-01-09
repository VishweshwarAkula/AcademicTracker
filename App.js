import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State to hold attendance data, loading state, and error message
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);  // To show loading indicator
  const [error, setError] = useState(null);      // To store error messages

  // Fetch attendance data from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/attendance-stats')
      .then((response) => {
        setAttendanceData(response.data.attendance);
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError("Failed to fetch attendance data. Please try again later.");
        setLoading(false);  // Set loading to false if an error occurs
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, display the error message
  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  // Render the attendance stats for each subject
  return (
    <div className="App">
      <h1>Attendance Stats</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Classes</th>
            <th>Attended Classes</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(attendanceData).map((subject) => {
            const attendedClasses = attendanceData[subject];
            const totalClasses = attendedClasses.totalClasses;
            const attendancePercent = (attendedClasses.attended / totalClasses) * 100 || 0;

            return (
              <tr key={subject}>
                <td>{subject}</td>
                <td>{totalClasses}</td>
                <td>{attendedClasses.attended}</td>
                <td>{attendancePercent.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
