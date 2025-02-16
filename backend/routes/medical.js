const express = require("express");
const {
  createMedical,
  getAllMedical,
  getMedicalById,
  updateMedical,
  deleteMedical,
} = require("../controller/medicalController");

const router = express.Router();

router.post("/add", createMedical);
router.get("/get-medi", getAllMedical);
router.get("/get-medi/:id", getMedicalById);
router.put("/update/:id", updateMedical);
router.delete("/del/:id", deleteMedical);

module.exports = router;
