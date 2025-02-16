const User = require("../models/userModel");
const path = require("path");

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getStaffUsers = async (req, res) => {
  try {
    const staffUsers = await User.find({
      userType: { $in: ["staff", "instructor", "sales"] },
    });
    res.status(200).json(staffUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await User.find({ userType: "Student" });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getUser = async (req, res) => {
  try {
    const fetchUser = await User.findById(req.params.id);
    res.status(200).json(fetchUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editUser = async (req, res) => {
  try {
    const editUsers = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(editUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfilePic = async (req, res) => {
  try {
    const obj_Id = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const imageUrl = `/images/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      obj_Id,
      { profilePic: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found! ", obj_Id });
    }

    res.json({
      message: "Profile picture updated successfully!",
      obj_Id,
      imageUrl,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile picture!",
      error: error.message,
    });
  }
};

// Fetch all instructors
const getAllInstructors = async (req, res) => {
    try {
        const instructors = await User.find({ userType: "instructor" }).select("fullName");
        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch instructors", error: error.message });
    }
};

const searchStudents = async (req, res) => {
    try {
        const { terms } = req.query;
        if (!terms) {
            return res.status(400).json({ message: "Please provide a search query" });
        }

        const students = await User.find({
            userType: { $regex: /^student$/i }, 
            $or: [
                { fullName: { $regex: terms, $options: "i" } }, 
                { userId: { $regex: terms, $options: "i" } }   
            ]
        }).select("fullName userId");

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Failed to search students", error: error.message });
    }
};

module.exports = { addUser, getStaffUsers, getStudents, getAllInstructors, getUser, editUser, deleteUser, updateProfilePic, searchStudents };
