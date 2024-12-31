const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const mockInterviewController = require('../controllers/mockInterviewController');

router.post('/job', jobController.createJob);
router.get('/job/:id', jobController.getJob);
router.put('/job/:id', jobController.updateJob);
router.delete('/job/:id', jobController.deleteJob);
router.get('/jobs', jobController.listJobs);

router.post('/jobs/:jobId/skills', jobController.addSkillToJob);
router.delete('/jobs/:jobId/skills/:skillId', jobController.removeSkillFromJob);

router.post('/mockInterview', mockInterviewController.createMockInterview);
router.get('/mockInterview/:id', mockInterviewController.getMockInterview);
router.put('/mockInterview/:id', mockInterviewController.updateMockInterview);
router.delete('/mockInterview/:id', mockInterviewController.deleteMockInterview);
router.get('/mockInterviews', mockInterviewController.listMockInterviews);

module.exports = router;
