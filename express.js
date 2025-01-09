const express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// File path for storing attendance data
const dataFilePath = path.join(__dirname, 'attendanceData.json');

// Function to read the data from the file
function readAttendanceData() {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    } else {
        return {
            attendedClassesCS: 0, totalClassesCS: 0,
            attendedClassesEE_Lab: 0, totalClassesEE_Lab: 0,
            attendedClassesPhysics: 0, totalClassesPhysics: 0,
            attendedClassesMath: 0, totalClassesMath: 0,
            attendedClassesPPS: 0, totalClassesPPS: 0,
            attendedClassesBEE: 0, totalClassesBEE: 0,
            attendedClassesBSE: 0, totalClassesBSE: 0,
            attendedClassesNSS: 0, totalClassesNSS: 0,
            attendedClassesPhysics_Lab: 0, totalClassesPhysics_Lab: 0
        };
    }
}

// Function to write the data back to the file
function writeAttendanceData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Your class schedule (as before)
const classSchedule = {
    Monday: ["Communication Skills", "EE Lab", "Physics", "Math", "PPS"],
    Tuesday: ["PPS", "Physics Lab"],
    Wednesday: ["Math", "PPS", "BEE", "Physics"],
    Thursday: ["BSE", "BEE", "PPS", "Math", "Physics", "NSS"],
    Friday: ["BEE", "Physics", "Math", "PPS", "BSE", "EE Lab"]
};

// Function to mark all classes as present for the current day
function markAttendanceForToday() {
    const data = readAttendanceData();
    const dayOfWeek = new Date().getDay(); // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    let currentDay;
    switch (dayOfWeek) {
        case 0: currentDay = 'Sunday'; break;
        case 1: currentDay = 'Monday'; break;
        case 2: currentDay = 'Tuesday'; break;
        case 3: currentDay = 'Wednesday'; break;
        case 4: currentDay = 'Thursday'; break;
        case 5: currentDay = 'Friday'; break;
        case 6: currentDay = 'Saturday'; break;
        default: currentDay = '';
    }

    if (classSchedule[currentDay]) {
        classSchedule[currentDay].forEach((subject) => {
            // Increment totalClasses and attendedClasses for the specific subject
            if (subject === "Communication Skills") {
                data.totalClassesCS++;
                data.attendedClassesCS++;
            }
            if (subject === "EE Lab") {
                data.totalClassesEE_Lab++;
                data.attendedClassesEE_Lab++;
            }
            if (subject === "Physics") {
                data.totalClassesPhysics++;
                data.attendedClassesPhysics++;
            }
            if (subject === "Math") {
                data.totalClassesMath++;
                data.attendedClassesMath++;
            }
            if (subject === "PPS") {
                data.totalClassesPPS++;
                data.attendedClassesPPS++;
            }
            if (subject === "BEE") {
                data.totalClassesBEE++;
                data.attendedClassesBEE++;
            }
            if (subject === "BSE") {
                data.totalClassesBSE++;
                data.attendedClassesBSE++;
            }
            if (subject === "NSS") {
                data.totalClassesNSS++;
                data.attendedClassesNSS++;
            }
            if (subject === "Physics Lab") {
                data.totalClassesPhysics_Lab++;
                data.attendedClassesPhysics_Lab++;
            }
        });
    }

    // Write updated data back to the file
    writeAttendanceData(data);
    console.log(`Attendance for ${currentDay} marked as present for all classes.`);
}

// Schedule a cron job to run the markAttendanceForToday function every day at midnight (00:00)
cron.schedule('0 0 * * *', () => {
    console.log('Cron job running at 12:00 AM...');
    markAttendanceForToday();
});

// Routes for handling user requests
app.use(express.json());

// Mark attendance manually for a specific day
app.post('/mark-attendance', (req, res) => {
    markAttendanceForToday();
    res.send('Attendance for today has been marked as present for all classes.');
});

// Endpoint to mark a subject as missed (mark absence)
app.post('/mark-absent', (req, res) => {
    const { subject } = req.body;
    if (!subject) {
        return res.status(400).send("Please provide a subject.");
    }

    const data = readAttendanceData();

    // Deduct attendance for the missed subject
    if (subject === "Communication Skills" && data.attendedClassesCS > 0) data.attendedClassesCS--;
    if (subject === "EE Lab" && data.attendedClassesEE_Lab > 0) data.attendedClassesEE_Lab--;
    if (subject === "Physics" && data.attendedClassesPhysics > 0) data.attendedClassesPhysics--;
    if (subject === "Math" && data.attendedClassesMath > 0) data.attendedClassesMath--;
    if (subject === "PPS" && data.attendedClassesPPS > 0) data.attendedClassesPPS--;
    if (subject === "BEE" && data.attendedClassesBEE > 0) data.attendedClassesBEE--;
    if (subject === "BSE" && data.attendedClassesBSE > 0) data.attendedClassesBSE--;
    if (subject === "NSS" && data.attendedClassesNSS > 0) data.attendedClassesNSS--;
    if (subject === "Physics Lab" && data.attendedClassesPhysics_Lab > 0) data.attendedClassesPhysics_Lab--;

    // Write updated data back to the file
    writeAttendanceData(data);
    res.send(`Attendance for ${subject} has been marked as missed.`);
});

// Endpoint to mark multiple absents for a subject
app.post('/mark-multiple-absents', (req, res) => {
    const { subject, count } = req.body;
    if (!subject || !count || count <= 0) {
        return res.status(400).send("Please provide a valid subject and a positive number of missed classes.");
    }

    const data = readAttendanceData();

    // Subtract the number of missed classes (count) for the specific subject
    if (subject === "Communication Skills") {
        data.attendedClassesCS = Math.max(0, data.attendedClassesCS - count);
    }
    if (subject === "EE Lab") {
        data.attendedClassesEE_Lab = Math.max(0, data.attendedClassesEE_Lab - count);
    }
    if (subject === "Physics") {
        data.attendedClassesPhysics = Math.max(0, data.attendedClassesPhysics - count);
    }
    if (subject === "Math") {
        data.attendedClassesMath = Math.max(0, data.attendedClassesMath - count);
    }
    if (subject === "PPS") {
        data.attendedClassesPPS = Math.max(0, data.attendedClassesPPS - count);
    }
    if (subject === "BEE") {
        data.attendedClassesBEE = Math.max(0, data.attendedClassesBEE - count);
    }
    if (subject === "BSE") {
        data.attendedClassesBSE = Math.max(0, data.attendedClassesBSE - count);
    }
    if (subject === "NSS") {
        data.attendedClassesNSS = Math.max(0, data.attendedClassesNSS - count);
    }
    if (subject === "Physics Lab") {
        data.attendedClassesPhysics_Lab = Math.max(0, data.attendedClassesPhysics_Lab - count);
    }

    // Write updated data back to the file
    writeAttendanceData(data);
    res.send(`${count} absences for ${subject} have been marked.`);
});


// Endpoint to retrieve attendance stats
app.get('/', (req, res) => {
    const data = readAttendanceData();

    // Calculate attendance percentage for each subject
    const attendanceStats = {
        attendance: {
            "Communication Skills": (data.attendedClassesCS / data.totalClassesCS) * 100 ,
            "EE Lab": (data.attendedClassesEE_Lab / data.totalClassesEE_Lab) * 100 ,
            "Physics": (data.attendedClassesPhysics / data.totalClassesPhysics) * 100 ,
            "Math": (data.attendedClassesMath / data.totalClassesMath) * 100 ,
            "PPS": (data.attendedClassesPPS / data.totalClassesPPS) * 100 ,
            "BEE": (data.attendedClassesBEE / data.totalClassesBEE) * 100 ,
            "BSE": (data.attendedClassesBSE / data.totalClassesBSE) * 100 ,
            "NSS": (data.attendedClassesNSS / data.totalClassesNSS) * 100 ,
            "Physics Lab": (data.attendedClassesPhysics_Lab / data.totalClassesPhysics_Lab) * 100 
        }
    };

    res.json(attendanceStats);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Attendance app listening at http://localhost:${port}`);
});
