#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <sstream>
#include "attendance.h"

int totalClassesOccurred = 0;
int attendedClassesCS = 0, attendedClassesEE_Lab = 0, attendedClassesPhysics = 0, attendedClassesMath = 0;
int attendedClassesPPS = 0, attendedClassesBEE = 0, attendedClassesBSE = 0, attendedClassesNSS = 0, attendedClassesPhysics_Lab = 0;

std::vector<std::string> daysOfWeek = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

std::map<std::string, std::vector<std::string>> classSchedule = {
    {"Monday", {"Communication Skills", "EE Lab", "Physics", "Math", "PPS"}},
    {"Tuesday", {"PPS", "Physics Lab"}},
    {"Wednesday", {"Math", "PPS", "BEE", "Physics"}},
    {"Thursday", {"BSE", "BEE", "PPS", "Math", "Physics", "NSS"}},
    {"Friday", {"BEE", "Physics", "Math", "PPS", "BSE", "EE Lab"}}
};

std::vector<std::string> holidays = {"2025-01-01", "2025-12-25"};

bool checkHoliday(const std::string& currentDate) {
    for (const auto& holiday : holidays) {
        if (currentDate == holiday) {
            return true;
        }
    }
    return false;
}

std::string getCurrentDate() {
    return "2025-01-08"; // Example: Replace with actual date logic
}

std::string getCurrentDay() {
    return "Wednesday"; // Example: Replace with actual day logic
}

bool isAfterSixPM() {
    // Here, you can implement actual logic to check if it's after 6 PM
    return true; // Assume it is after 6 PM for the sake of this example
}

void markAttendance(const std::string& day) {
    if (checkHoliday(getCurrentDate())) {
        std::cout << "Today is a holiday. No classes.\n";
        return;
    }

    totalClassesOccurred++;

    for (const auto& subject : classSchedule[day]) {
        if (subject == "Communication Skills") attendedClassesCS++;
        if (subject == "EE Lab") attendedClassesEE_Lab++;
        if (subject == "Physics") attendedClassesPhysics++;
        if (subject == "Math") attendedClassesMath++;
        if (subject == "PPS") attendedClassesPPS++;
        if (subject == "BEE") attendedClassesBEE++;
        if (subject == "BSE") attendedClassesBSE++;
        if (subject == "NSS") attendedClassesNSS++;
        if (subject == "Physics Lab") attendedClassesPhysics_Lab++;
    }
}

void markAbsent(const std::string& subject) {
    if (subject == "Communication Skills" && attendedClassesCS > 0) {
        attendedClassesCS--;
    } else if (subject == "EE Lab" && attendedClassesEE_Lab > 0) {
        attendedClassesEE_Lab--;
    } else if (subject == "Physics" && attendedClassesPhysics > 0) {
        attendedClassesPhysics--;
    } else if (subject == "Math" && attendedClassesMath > 0) {
        attendedClassesMath--;
    } else if (subject == "PPS" && attendedClassesPPS > 0) {
        attendedClassesPPS--;
    } else if (subject == "BEE" && attendedClassesBEE > 0) {
        attendedClassesBEE--;
    } else if (subject == "BSE" && attendedClassesBSE > 0) {
        attendedClassesBSE--;
    } else if (subject == "NSS" && attendedClassesNSS > 0) {
        attendedClassesNSS--;
    } else if (subject == "Physics Lab" && attendedClassesPhysics_Lab > 0) {
        attendedClassesPhysics_Lab--;
    }
    std::cout << "Marked " << subject << " as missed.\n";
}

void updateAttendance() {
    float percentageCS = (attendedClassesCS > 0) ? (attendedClassesCS / float(totalClassesOccurred)) * 100 : 0;
    float percentageEE_Lab = (attendedClassesEE_Lab > 0) ? (attendedClassesEE_Lab / float(totalClassesOccurred)) * 100 : 0;
    float percentagePhysics = (attendedClassesPhysics > 0) ? (attendedClassesPhysics / float(totalClassesOccurred)) * 100 : 0;
    float percentageMath = (attendedClassesMath > 0) ? (attendedClassesMath / float(totalClassesOccurred)) * 100 : 0;
    float percentagePPS = (attendedClassesPPS > 0) ? (attendedClassesPPS / float(totalClassesOccurred)) * 100 : 0;
    float percentageBEE = (attendedClassesBEE > 0) ? (attendedClassesBEE / float(totalClassesOccurred)) * 100 : 0;
    float percentageBSE = (attendedClassesBSE > 0) ? (attendedClassesBSE / float(totalClassesOccurred)) * 100 : 0;
    float percentageNSS = (attendedClassesNSS > 0) ? (attendedClassesNSS / float(totalClassesOccurred)) * 100 : 0;
    float percentagePhysics_Lab = (attendedClassesPhysics_Lab > 0) ? (attendedClassesPhysics_Lab / float(totalClassesOccurred)) * 100 : 0;

    std::cout << "Attendance Dashboard:\n";
    std::cout << "Communication Skills: " << attendedClassesCS << "/" << totalClassesOccurred << " (" << percentageCS << "%)\n";
    std::cout << "EE Lab: " << attendedClassesEE_Lab << "/" << totalClassesOccurred << " (" << percentageEE_Lab << "%)\n";
    std::cout << "Physics: " << attendedClassesPhysics << "/" << totalClassesOccurred << " (" << percentagePhysics << "%)\n";
    std::cout << "Math: " << attendedClassesMath << "/" << totalClassesOccurred << " (" << percentageMath << "%)\n";
    std::cout << "PPS: " << attendedClassesPPS << "/" << totalClassesOccurred << " (" << percentagePPS << "%)\n";
    std::cout << "BEE: " << attendedClassesBEE << "/" << totalClassesOccurred << " (" << percentageBEE << "%)\n";
    std::cout << "BSE: " << attendedClassesBSE << "/" << totalClassesOccurred << " (" << percentageBSE << "%)\n";
    std::cout << "NSS: " << attendedClassesNSS << "/" << totalClassesOccurred << " (" << percentageNSS << "%)\n";
    std::cout << "Physics Lab: " << attendedClassesPhysics_Lab << "/" << totalClassesOccurred << " (" << percentagePhysics_Lab << "%)\n";
}

void handleMissedClasses(const std::string& subject) {
    markAbsent(subject);
}
