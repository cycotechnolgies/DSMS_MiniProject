const express = require("express");
const { addStaff } = require("../controller/staffController");

const router = express.Router();

router.post("/", addStaff);

module.exports = router;
