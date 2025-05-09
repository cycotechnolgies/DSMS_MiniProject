const express = require("express");
const {
  getEvents,
  addEvent,
  deleteEvent,
} = require("../controller/evemtController");
const router = express.Router();

// Get all events
router.get("/", getEvents);

// Add a new event
router.post("/", addEvent);

// Delete an event
router.delete("/:id", deleteEvent);

module.exports = router;
