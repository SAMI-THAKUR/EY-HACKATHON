const express = require("express");
const router = express.Router();
const { 
  createCareerPath, 
  getCareerPath, 
  updateCareerPath, 
  deleteCareerPath, 
  listCareerPaths,
  addSkillToCareerPath,
  removeSkillFromCareerPath
} = require("../controller/career_path.controller");

// Career Path Routes
router.post('/career-path', createCareerPath);
router.get('/career-path/:id', getCareerPath);
router.put('/career-path/:id', updateCareerPath);
router.delete('/career-path/:id', deleteCareerPath);
router.get('/career-paths', listCareerPaths);

router.post('/career-paths/:careerPathId/skills', addSkillToCareerPath);
router.delete('/career-paths/:careerPathId/skills/:skillId', removeSkillFromCareerPath);

module.exports = router;
