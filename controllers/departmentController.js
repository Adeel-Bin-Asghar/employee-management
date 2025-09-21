const Department = require("../models/Department");

exports.createDepartment = async (req, res) => {
  try {
    const dept = new Department(req.body);
    await dept.save();
    res.status(201).json(dept);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDepartments = async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
};
