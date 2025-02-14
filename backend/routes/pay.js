const express = require("express");
const {
  addPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controller/payController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/slips");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Route to add a user
router.post("/add", upload.single("slip"), addPayment);
router.get("/get-all", getPayments);
router.get("/get-pay/:id", getPaymentById);
router.put("/update-pay/:id", upload.single("slip"), updatePayment);
router.delete("/del-pay/:id", deletePayment);

module.exports = router;