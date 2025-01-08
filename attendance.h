#ifndef ATTENDANCE_H
#define ATTENDANCE_H

#include <map>
#include <vector>
#include <string>

// Attendance Variables
extern int totalClassesOccurred;
extern int attendedClassesCS, attendedClassesEE_Lab, attendedClassesPhysics, attendedClassesMath;
extern int attendedClassesPPS, attendedClassesBEE, attendedClassesBSE, attendedClassesNSS, attendedClassesPhysics_Lab;

extern std::vector<std::string> daysOfWeek;
extern std::map<std::string, std::vector<std::string>> classSchedule;
extern std::vector<std::string> holidays;

// Functions to interact with the attendance data
void markAttendance(const std::string& day);
void markAbsent(const std::string& subject);
void updateAttendance();  // Ensure this function is declared here
void handleMissedClasses(const std::string& subject);
void markMultipleAbsents(const std::string& subject, int count);  // New function

bool checkHoliday(const std::string& currentDate);
std::string getCurrentDate();
std::string getCurrentDay();
bool isAfterSixPM();

#endif  // ATTENDANCE_H
