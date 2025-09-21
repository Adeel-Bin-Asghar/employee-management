// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Department = require("./models/Department");
const Employee = require("./models/Employee");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/employee_management";

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB...");

    // Clear old data
    await Department.deleteMany({});
    await Employee.deleteMany({});
    console.log("🗑️ Old data cleared...");

    // Insert Departments
    const departments = await Department.insertMany([
      { name: "General Dentistry" },
      { name: "Pediatric Dentistry" },
      { name: "Restorative Dentistry" },
      { name: "Surgery" },
      { name: "Orthodontics" },
    ]);
    console.log("🏥 Departments seeded:", departments.map(d => d.name));

    // Insert Employees (now with firstName + lastName)
    const employees = [
      { firstName: "Lisa", lastName: "Harris", department: departments[2]._id },       // Restorative
      { firstName: "Alfred", lastName: "Christensen", department: departments[0]._id }, // General
      { firstName: "John", lastName: "Dudley", department: departments[0]._id },        // General
      { firstName: "Danny", lastName: "Perez", department: departments[2]._id },        // Restorative
      { firstName: "Sarah", lastName: "Alvarez", department: departments[1]._id },      // Pediatric
      { firstName: "Constance", lastName: "Smith", department: departments[3]._id },    // Surgery
      { firstName: "Travis", lastName: "Combs", department: departments[0]._id },       // General (not listed originally but ok)
      { firstName: "Francisco", lastName: "Willard", department: departments[1]._id },  // Pediatric
      { firstName: "Janet", lastName: "Doe", department: departments[0]._id },          // General
      { firstName: "Leslie", lastName: "Roche", department: departments[4]._id },       // Ortho
    ];

    await Employee.insertMany(employees);
    console.log("👩‍⚕️ Employees seeded successfully!");

    mongoose.connection.close();
    console.log("🔒 Connection closed.");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    mongoose.connection.close();
  }
}

seedDatabase();
