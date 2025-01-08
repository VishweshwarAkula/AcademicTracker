#include <iostream>
#include <map>
#include <string>
#include "attendance.h"

// Function to mark a specific number of missed classes
void markMultipleAbsents(const std::string& subject, int count) {
    // Decrease the class attendance by the number of missed classes
    if (subject == "Communication Skills") {
        attendedClassesCS = std::max(0, attendedClassesCS - count); // Prevent negative attendance
    } else if (subject == "EE Lab") {
        attendedClassesEE_Lab = std::max(0, attendedClassesEE_Lab - count);
    } else if (subject == "Physics") {
        attendedClassesPhysics = std::max(0, attendedClassesPhysics - count);
    } else if (subject == "Math") {
        attendedClassesMath = std::max(0, attendedClassesMath - count);
    } else if (subject == "PPS") {
        attendedClassesPPS = std::max(0, attendedClassesPPS - count);
    } else if (subject == "BEE") {
        attendedClassesBEE = std::max(0, attendedClassesBEE - count);
    } else if (subject == "BSE") {
        attendedClassesBSE = std::max(0, attendedClassesBSE - count);
    } else if (subject == "NSS") {
        attendedClassesNSS = std::max(0, attendedClassesNSS - count);
    } else if (subject == "Physics Lab") {
        attendedClassesPhysics_Lab = std::max(0, attendedClassesPhysics_Lab - count);
    } else {
        std::cout << "Unknown subject: " << subject << "\n";
        return;
    }

    std::cout << "Marked " << count << " classes of " << subject << " as missed.\n";
}

