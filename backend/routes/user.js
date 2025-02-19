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
const authenticateToken = require("../middleware/authMiddleware");  // Import authenticateToken
const checkRole = require("../middleware/roleMiddleware");          // Import checkRole

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

// Route to add a user (no authentication required if public access)
router.post("/add", addUser);

// Route to get staff users (requires staff role)
router.get("/staff", getStaffUsers);

// Route to get students (requires staff role)
router.get("/students", getStudents);

// Route to get a specific user (accessible to any authenticated user)
router.get("/get-user/:id", getUser);

// Route to edit a user (requires staff role)
router.put("/edit-user/:id",  editUser);

// Route to edit user's profile picture (requires authentication)
router.put("/edit-profilePic/:id",  upload.single("profilePic"), updateProfilePic);

// Route to delete a user (requires staff role)
router.delete("/del-user/:id", deleteUser);

// Route to get all instructors (accessible to any authenticated user)
router.get("/instructors", getAllInstructors);

// Route to search students (accessible to any authenticated user)
router.get("/students/search", searchStudents);

module.exports = router;
