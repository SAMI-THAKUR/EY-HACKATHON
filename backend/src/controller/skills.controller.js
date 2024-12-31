const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

module.exports = {
  // Create Mock Interview
  createMockInterview: async (req, res) => {
    try {
      const newMockInterview = await db.mockInterview.create({
        data: req.body,
      });
      res.status(201).json(newMockInterview);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get Mock Interview by ID
  getMockInterview: async (req, res) => {
    try {
      const mockInterview = await db.mockInterview.findUnique({
        where: { id: req.params.id },
      });
      if (mockInterview) {
        res.status(200).json(mockInterview);
      } else {
        res.status(404).json({ success: false, message: 'Mock Interview not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update Mock Interview
  updateMockInterview: async (req, res) => {
    try {
      const updatedMockInterview = await db.mockInterview.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.status(200).json(updatedMockInterview);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete Mock Interview
  deleteMockInterview: async (req, res) => {
    try {
      await db.mockInterview.delete({
        where: { id: req.params.id },
      });
      res.status(200).json({ success: true, message: 'Mock Interview deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // List All Mock Interviews
  listMockInterviews: async (req, res) => {
    try {
      const mockInterviews = await db.mockInterview.findMany();
      res.status(200).json(mockInterviews);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};