const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

// Create Career Path
const createCareerPath = async (req, res) => {
  try {
    const { title, description, roles, additionalInfo } = req.body;

    const careerPath = await db.careerPath.create({
      data: {
        title,
        description,
        roles,
        additionalInfo,
      },
    });

    return res.status(201).json({ success: true, careerPath });
  } catch (error) {
    console.error("Error creating career path:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Get Career Path by ID
const getCareerPath = async (req, res) => {
  try {
    const { id } = req.params;

    const careerPath = await db.careerPath.findUnique({
      where: { id },
    });

    if (!careerPath) {
      return res.status(404).json({ success: false, message: "Career path not found" });
    }

    return res.status(200).json({ success: true, careerPath });
  } catch (error) {
    console.error("Error retrieving career path:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Update Career Path
const updateCareerPath = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, roles, additionalInfo } = req.body;

    const updatedCareerPath = await db.careerPath.update({
      where: { id },
      data: { title, description, roles, additionalInfo },
    });

    return res.status(200).json({ success: true, careerPath: updatedCareerPath });
  } catch (error) {
    console.error("Error updating career path:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Career Path
const deleteCareerPath = async (req, res) => {
  try {
    const { id } = req.params;

    await db.careerPath.delete({
      where: { id },
    });

    return res.status(200).json({ success: true, message: "Career path deleted successfully" });
  } catch (error) {
    console.error("Error deleting career path:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// List Career Paths
const listCareerPaths = async (req, res) => {
  try {
    const careerPaths = await db.careerPath.findMany();

    return res.status(200).json({ success: true, careerPaths });
  } catch (error) {
    console.error("Error listing career paths:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Add Skill to Career Path
const addSkillToCareerPath = async (req, res) => {
  const { careerPathId } = req.params;
  const { skillId } = req.body;
  try {
    const careerPathSkill = await db.careerPathSkill.create({
      data: {
        careerPathId,
        skillId,
      },
    });
    return res.status(201).json({ success: true, careerPathSkill });
  } catch (error) {
    console.error("Error adding skill to career path:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Remove Skill from Career Path
const removeSkillFromCareerPath = async (req, res) => {
  const { careerPathId, skillId } = req.params;
  try {
    await db.careerPathSkill.delete({
      where: {
        careerPathId_skillId: {
          careerPathId,
          skillId,
        },
      },
    });
    return res.status(200).json({ success: true, message: "Skill removed from career path" });
  } catch (error) {
    console.error("Error removing skill from career path:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCareerPath,
  getCareerPath,
  updateCareerPath,
  deleteCareerPath,
  listCareerPaths,
  addSkillToCareerPath,
  removeSkillFromCareerPath,
};