const express = require("express");
const router = express.Router();
const { 
  createLearningResource, 
  getLearningResource, 
  updateLearningResource, 
  deleteLearningResource, 
  listLearningResources,
  addSkillToLearningResource,
  removeSkillFromLearningResource
} = require("../controller/learning.controller");

router.post('/learning-resource', createLearningResource);
router.get('/learning-resource/:id', getLearningResource);
router.put('/learning-resource/:id', updateLearningResource);
router.delete('/learning-resource/:id', deleteLearningResource);
router.get('/learning-resources', listLearningResources);

router.post('/learning-resources/:learningResourceId/skills', addSkillToLearningResource);
router.delete('/learning-resources/:learningResourceId/skills/:skillId', removeSkillFromLearningResource);

module.exports = router;
