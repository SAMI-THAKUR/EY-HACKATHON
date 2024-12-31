
const express = require("express");
const router = express.Router();
const { listEvents, getEvent } = require("../controller/event.controller");

// Event Routes
router.get('/events', listEvents);
router.get('/event/:id', getEvent);

module.exports = router;