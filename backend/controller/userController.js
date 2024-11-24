const User = require("../models/userModel");

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

module.exports = { addUser, getStaffUsers, getUser, editUser, deleteUser };
