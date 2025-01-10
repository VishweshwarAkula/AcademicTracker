import React, { useState, useEffect } from 'react';

function App() {
  const [attendanceData, setAttendanceData] = useState(null);
  const [subject, setSubject] = useState('');
  const [missedCount, setMissedCount] = useState('');
  const [error, setError] = useState('');

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

    // Set up polling every 2 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const renderAttendancePercentage = (subject) => {
    if (attendanceData && attendanceData[subject] !== undefined) {
      return attendanceData[subject].toFixed(2);
    }
    return 'N/A';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for valid subject and missed count
    if (!subject || !missedCount || isNaN(missedCount) || missedCount <= 0) {
      setError('Please provide a valid subject and a positive number of missed classes.');
      return;
    }

    // Reset the error message if everything is valid
    setError('');

    // Send a POST request to update the attendance data
    const data = { subject, count: parseInt(missedCount, 10) };

    fetch('http://localhost:3000/mark-absent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        // Refresh attendance data after updating
        fetchData();
      })
      .catch(err => {
        console.error("Error submitting data:", err);
      });
  };

  if (!attendanceData) {
    return <div>Loading attendance data...</div>;
  }

  return (
    <div className="App">
      <h1>Attendance Tracker</h1>
      <div>
        {/* Render attendance percentage for each subject */}
        {Object.keys(attendanceData).map((subject) => (
          <div key={subject}>
            <h3>{subject}</h3>
            <p>Attendance Percentage: {renderAttendancePercentage(subject)}%</p>
          </div>
        ))}
      </div>

      <h2>Mark Attendance as Absent</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject: </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select a Subject</option>
            <option value="Communication Skills">Communication Skills</option>
            <option value="EE Lab">EE Lab</option>
            <option value="Physics">Physics</option>
            <option value="Math">Math</option>
            <option value="PPS">PPS</option>
            <option value="BEE">BEE</option>
            <option value="BSE">BSE</option>
            <option value="NSS">NSS</option>
            <option value="Physics Lab">Physics Lab</option>
          </select>
        </div>
        <div>
          <label htmlFor="missedCount">Number of Missed Classes: </label>
          <input
            id="missedCount"
            type="number"
            value={missedCount}
            onChange={(e) => setMissedCount(e.target.value)}
            min="1"
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Dialogflow Chatbot Iframe */}
      <h2>Chat with our Assistant</h2>
      <iframe
        width="350"
        height="430"
        allow="microphone;"
        src="https://console.dialogflow.com/api-client/demo/embedded/522b241d-8513-4381-8ee1-336b93bfc6a6"
        title="Dialogflow Chatbot"
      ></iframe>
    </div>
  );
}

export default App;
