const express = require("express");
const {
  addUser,
  getStaffUsers,
  getUser,
  editUser,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

// Route to add a user
router.post("/add", addUser);

router.get("/staff", getStaffUsers);

router.get("/get-user/:id", getUser);

router.put("/edit-user/:id", editUser);

router.delete("/del-user/:id", deleteUser);

module.exports = router;
