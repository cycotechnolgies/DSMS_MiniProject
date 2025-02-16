const express = require("express");
const {
  addUser,
  getStaffUsers,
  getStudents,
  getUser,
  editUser,
  deleteUser,
  updateProfilePic,
  getAllInstructors,
  searchStudents,
} = require("../controller/userController");
const multer = require("multer");
const path = require("path");



const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Route to add a user
router.post("/add", addUser);

router.get("/staff", getStaffUsers);

router.get("/students", getStudents);

router.get("/get-user/:id", getUser);

router.put("/edit-user/:id", editUser);

router.put("/edit-profilePic/:id",upload.single("profilePic"), updateProfilePic);

router.delete("/del-user/:id", deleteUser);

router.get("/instructors", getAllInstructors);

router.get("/students/search", searchStudents);

module.exports = router;
