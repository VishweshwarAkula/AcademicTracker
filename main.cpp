#include <iostream>
#include "attendance.h"
#include <sstream>  

int main() {
    // Simulating marking attendance for a day
    markAttendance("Monday");

    // Simulating a scenario after 6 PM where the user inputs the missed classes
    if (isAfterSixPM()) {
        std::cout << "\nPlease input the subject and number of missed classes (e.g., 'BSE 2'):\n";
        std::string missedInput;
        std::getline(std::cin, missedInput);

        
        std::string subject;
        int count;
        std::istringstream ss(missedInput);
        ss >> subject >> count;  
        
        if (ss.fail()) {
            std::cout << "Invalid input. Please provide the subject and number of missed classes correctly.\n";
        } else {
            markMultipleAbsents(subject, count);  // Call the new function to mark multiple missed classes
        }
    }

    // Update and display attendance
    updateAttendance();

    return 0;
}
