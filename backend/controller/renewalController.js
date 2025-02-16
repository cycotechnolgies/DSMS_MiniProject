const LicenceRenewal = require('../models/renewalModle');

// Add new Licence Renewal
const addRenewal = async (req, res) => {
  try {
      const renewal = new LicenceRenewal(req.body);
      await renewal.save();
      res.status(201).json({ success: true, message: "Renewal record created", data: renewal });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
};

// Update Licence Renewal
const updateRenewal = async (req, res) => {
  try {
      const renewal = await LicenceRenewal.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!renewal) return res.status(404).json({ success: false, message: "Renewal record not found" });
      res.status(200).json({ success: true, message: "Renewal record updated", data: renewal });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};

// Get all renewal
const getRenewal = async (req, res) => {
    try {
        const renewal = await LicenceRenewal.find();
        res.json(renewal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a Licence Renewal by ID
const getRenewalById = async (req, res) => {
   try {
    const renewal = await LicenceRenewal.findById(req.params.id);
    if (!renewal) return res.status(404).json({ message: "Renewal recode not found" });
    res.json(renewal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete Renewal
const deleteRenewal = async (req, res) => {
    try {
        const { id } = req.params;
        const renewal = await LicenceRenewal.findById(id);

        if (!renewal) {
            return res.status(404).json({ message: "Renewal not found" });
        }

        await LicenceRenewal.findByIdAndDelete(id);
        res.json({ message: "Renewal deleted successfully" });
    } catch (error) {
        console.error("Error deleting Renewal:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addRenewal, updateRenewal, getRenewalById, deleteRenewal, getRenewal };
