const Medical = require("../models/medicalModle");

// Create Medical Record
const createMedical = async (req, res) => {
  try {
    const medical = new Medical(req.body);
    await medical.save();
    res.status(201).json({ success: true, message: "Medical record created", data: medical });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//  Get All Medical Records
const getAllMedical = async (req, res) => {
  try {
        const medical = await Medical.find();
        res.json(medical);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Single Medical Record
const getMedicalById = async (req, res) => {
  try {
    const medical = await Medical.findById(req.params.id);
    if (!medical) return res.status(404).json({ success: false, message: "Medical record not found" });
    res.status(200).json({ success: true, data: medical });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Medical Record
const updateMedical = async (req, res) => {
  try {
    const medical = await Medical.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medical) return res.status(404).json({ success: false, message: "Medical record not found" });
    res.status(200).json({ success: true, message: "Medical record updated", data: medical });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Medical Record
const deleteMedical = async (req, res) => {
  try {
    const medical = await Medical.findByIdAndDelete(req.params.id);
    if (!medical) return res.status(404).json({ success: false, message: "Medical record not found" });
    res.status(200).json({ success: true, message: "Medical record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createMedical, getAllMedical, getMedicalById, updateMedical, deleteMedical };