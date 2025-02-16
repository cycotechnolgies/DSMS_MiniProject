const express = require('express');
const {
  addRenewal, updateRenewal, getRenewalById, deleteRenewal, getRenewal,
} = require("../controller/renewalController");
const path = require("path");
const router = express.Router();

//Renewal Routes
router.post('/add', addRenewal);
router.put('/edit/:id', updateRenewal);
router.get('/get-renewal', getRenewal);
router.get('/get-renewal/:id', getRenewalById);
router.delete('/del/:id', deleteRenewal);

module.exports = router;
