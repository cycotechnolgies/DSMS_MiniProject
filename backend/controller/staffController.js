const Staff = require("../models/staffModel");

const addStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json({ message: "Staff member added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { addStaff };
