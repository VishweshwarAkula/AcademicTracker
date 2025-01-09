import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State to hold attendance data
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    /
    axios.get('http://localhost:3000/attendance-stats')
      .then((response) => {
        setAttendanceData(response.data.attendance);
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  if (!attendanceData) {
    return <div>Loading...</div>; // Display loading message until data is fetched
  }

  
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
