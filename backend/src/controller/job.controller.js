
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const mockInterviewController = require('../controllers/mockInterviewController');

// Add Skill to Job
const addSkillToJob = async (req, res) => {
  const { jobId } = req.params;
  const { skillId } = req.body;
  try {
    const jobSkill = await db.jobSkill.create({
      data: {
        jobId,
        skillId,
      },
    });
    return res.status(201).json({ success: true, jobSkill });
  } catch (error) {
    console.error("Error adding skill to job:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Remove Skill from Job
const removeSkillFromJob = async (req, res) => {
  const { jobId, skillId } = req.params;
  try {
    await db.jobSkill.delete({
      where: {
        jobId_skillId: {
          jobId,
          skillId,
        },
      },
    });
    return res.status(200).json({ success: true, message: "Skill removed from job" });
  } catch (error) {
    console.error("Error removing skill from job:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

router.post('/job', jobController.createJob);
router.get('/job/:id', jobController.getJob);
router.put('/job/:id', jobController.updateJob);
router.delete('/job/:id', jobController.deleteJob);
router.get('/jobs', jobController.listJobs);

router.post('/mockInterview', mockInterviewController.createMockInterview);
router.get('/mockInterview/:id', mockInterviewController.getMockInterview);
router.put('/mockInterview/:id', mockInterviewController.updateMockInterview);
router.delete('/mockInterview/:id', mockInterviewController.deleteMockInterview);
router.get('/mockInterviews', mockInterviewController.listMockInterviews);

router.post('/job/:jobId/skill', addSkillToJob);
router.delete('/job/:jobId/skill/:skillId', removeSkillFromJob);

module.exports = router;