const express = require("express");
const router = express.Router();
const { 
  // Import mock interview controllers from skills.controller.js
  createMockInterview,
  getMockInterview,
  updateMockInterview,
  deleteMockInterview,
  listMockInterviews
} = require("../controller/skills.controller"); // Updated path

// If additional skill-specific routes are needed, add them here.

router.post('/mock-interview', createMockInterview);
router.get('/mock-interview/:id', getMockInterview);
router.put('/mock-interview/:id', updateMockInterview);
router.delete('/mock-interview/:id', deleteMockInterview);
router.get('/mock-interviews', listMockInterviews);

module.exports = router;