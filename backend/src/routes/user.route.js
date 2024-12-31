const express = require("express");
const router = express.Router();
const { 
  getUser, 
  createUserPortfolio, 
  getUserPortfolio, 
  updateUserPortfolio, 
  deleteUserPortfolio,
  createMockInterview,
  getMockInterview,
  updateMockInterview,
  deleteMockInterview,
  listMockInterviews,
  addSkillToUser,
  removeSkillFromUser,
  createUser,
  getUserProfile // Added getUserProfile
} = require("../controller/user.controller");

router.get("/getuser", getUser);
router.post('/users', createUser); // Added POST /users route
router.post('/portfolio', createUserPortfolio);
router.get('/portfolio/:userId', getUserPortfolio);
router.put('/portfolio/:userId', updateUserPortfolio);
router.delete('/portfolio/:userId', deleteUserPortfolio);

router.post('/mock-interview', createMockInterview);
router.get('/mock-interview/:id', getMockInterview);
router.put('/mock-interview/:id', updateMockInterview);
router.delete('/mock-interview/:id', deleteMockInterview);
router.get('/mock-interviews', listMockInterviews);

router.post('/users/:userId/skills', addSkillToUser);
router.delete('/users/:userId/skills/:skillId', removeSkillFromUser);

router.get('/profiles', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        resumes: true,
        posts: true,
        mockInterviews: true,
        userSkills: {
          include: {
            skill: true,
          },
        },
        events: true,
        careerPaths: true,
        learningResources: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profiles." });
  }
});

// Update the route to include userId as a route parameter
router.get('/getUserProfile/:userId', getUserProfile);

module.exports = router;
