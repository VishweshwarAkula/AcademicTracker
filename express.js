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

// Function to mark all classes as present for the day
function markAttendanceForToday() {
    const data = readAttendanceData();

    // Increment the total classes occurred and attended for each subject
    Object.values(classSchedule).forEach((classes) => {
        classes.forEach((subject) => {
            // Increment totalClasses for the specific subject
            if (subject === "Communication Skills") data.totalClassesCS++;
            if (subject === "EE Lab") data.totalClassesEE_Lab++;
            if (subject === "Physics") data.totalClassesPhysics++;
            if (subject === "Math") data.totalClassesMath++;
            if (subject === "PPS") data.totalClassesPPS++;
            if (subject === "BEE") data.totalClassesBEE++;
            if (subject === "BSE") data.totalClassesBSE++;
            if (subject === "NSS") data.totalClassesNSS++;
            if (subject === "Physics Lab") data.totalClassesPhysics_Lab++;

            // Increment attendedClasses for the specific subject
            if (subject === "Communication Skills") data.attendedClassesCS++;
            if (subject === "EE Lab") data.attendedClassesEE_Lab++;
            if (subject === "Physics") data.attendedClassesPhysics++;
            if (subject === "Math") data.attendedClassesMath++;
            if (subject === "PPS") data.attendedClassesPPS++;
            if (subject === "BEE") data.attendedClassesBEE++;
            if (subject === "BSE") data.attendedClassesBSE++;
            if (subject === "NSS") data.attendedClassesNSS++;
            if (subject === "Physics Lab") data.attendedClassesPhysics_Lab++;
        });
    });

    // Write updated data back to the file
    writeAttendanceData(data);
    console.log("Attendance for today marked as present for all classes.");
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
    if (!subject || !count) {
        return res.status(400).send("Please provide a subject and number of missed classes.");
    }

    const data = readAttendanceData();

    // Deduct attendance for the missed classes
    for (let i = 0; i < count; i++) {
        if (subject === "Communication Skills" && data.attendedClassesCS > 0) data.attendedClassesCS--;
        if (subject === "EE Lab" && data.attendedClassesEE_Lab > 0) data.attendedClassesEE_Lab--;
        if (subject === "Physics" && data.attendedClassesPhysics > 0) data.attendedClassesPhysics--;
        if (subject === "Math" && data.attendedClassesMath > 0) data.attendedClassesMath--;
        if (subject === "PPS" && data.attendedClassesPPS > 0) data.attendedClassesPPS--;
        if (subject === "BEE" && data.attendedClassesBEE > 0) data.attendedClassesBEE--;
        if (subject === "BSE" && data.attendedClassesBSE > 0) data.attendedClassesBSE--;
        if (subject === "NSS" && data.attendedClassesNSS > 0) data.attendedClassesNSS--;
        if (subject === "Physics Lab" && data.attendedClassesPhysics_Lab > 0) data.attendedClassesPhysics_Lab--;
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
            "Communication Skills": (data.attendedClassesCS / data.totalClassesCS) * 100 || 0,
            "EE Lab": (data.attendedClassesEE_Lab / data.totalClassesEE_Lab) * 100 || 0,
            "Physics": (data.attendedClassesPhysics / data.totalClassesPhysics) * 100 || 0,
            "Math": (data.attendedClassesMath / data.totalClassesMath) * 100 || 0,
            "PPS": (data.attendedClassesPPS / data.totalClassesPPS) * 100 || 0,
            "BEE": (data.attendedClassesBEE / data.totalClassesBEE) * 100 || 0,
            "BSE": (data.attendedClassesBSE / data.totalClassesBSE) * 100 || 0,
            "NSS": (data.attendedClassesNSS / data.totalClassesNSS) * 100 || 0,
            "Physics Lab": (data.attendedClassesPhysics_Lab / data.totalClassesPhysics_Lab) * 100 || 0
        }
    };

    res.json(attendanceStats);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Attendance app listening at http://localhost:${port}`);
});
