const express = require("express");
const {
  addUser,
  getStaffUsers,
  getUser,
  editUser,
} = require("../controller/userController");

const router = express.Router();

// Route to add a user
router.post("/add", addUser);

router.get("/staff", getStaffUsers);

router.get("/get-user/:id", getUser);

router.put("/edit-user/:id", editUser);

module.exports = router;
