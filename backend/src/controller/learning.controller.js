const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

// Create Learning Resource
const createLearningResource = async (req, res) => {
  try {
    const { title, type, platform, link, tags, learningPath, additionalInfo } = req.body;

    const learningResource = await db.learningResource.create({
      data: {
        title,
        type,
        platform,
        link,
        tags,
        learningPath,
        additionalInfo,
      },
    });

    return res.status(201).json({ success: true, learningResource });
  } catch (error) {
    console.error("Error creating learning resource:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Get Learning Resource by ID
const getLearningResource = async (req, res) => {
  try {
    const { id } = req.params;

    const learningResource = await db.learningResource.findUnique({
      where: { id },
    });

    if (!learningResource) {
      return res.status(404).json({ success: false, message: "Learning resource not found" });
    }

    return res.status(200).json({ success: true, learningResource });
  } catch (error) {
    console.error("Error retrieving learning resource:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Update Learning Resource
const updateLearningResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, platform, link, tags, learningPath, additionalInfo } = req.body;

    const updatedLearningResource = await db.learningResource.update({
      where: { id },
      data: { title, type, platform, link, tags, learningPath, additionalInfo },
    });

    return res.status(200).json({ success: true, learningResource: updatedLearningResource });
  } catch (error) {
    console.error("Error updating learning resource:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Learning Resource
const deleteLearningResource = async (req, res) => {
  try {
    const { id } = req.params;

    await db.learningResource.delete({
      where: { id },
    });

    return res.status(200).json({ success: true, message: "Learning resource deleted successfully" });
  } catch (error) {
    console.error("Error deleting learning resource:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// List Learning Resources
const listLearningResources = async (req, res) => {
  try {
    const learningResources = await db.learningResource.findMany();

    return res.status(200).json({ success: true, learningResources });
  } catch (error) {
    console.error("Error listing learning resources:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Add Skill to Learning Resource
const addSkillToLearningResource = async (req, res) => {
  const { learningResourceId } = req.params;
  const { skillId } = req.body;
  try {
    const learningResourceSkill = await db.learningResourceSkill.create({
      data: {
        learningResourceId,
        skillId,
      },
    });
    return res.status(201).json({ success: true, learningResourceSkill });
  } catch (error) {
    console.error("Error adding skill to learning resource:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Remove Skill from Learning Resource
const removeSkillFromLearningResource = async (req, res) => {
  const { learningResourceId, skillId } = req.params;
  try {
    await db.learningResourceSkill.delete({
      where: {
        learningResourceId_skillId: {
          learningResourceId,
          skillId,
        },
      },
    });
    return res.status(200).json({ success: true, message: "Skill removed from learning resource" });
  } catch (error) {
    console.error("Error removing skill from learning resource:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createLearningResource,
  getLearningResource,
  updateLearningResource,
  deleteLearningResource,
  listLearningResources,
  addSkillToLearningResource,
  removeSkillFromLearningResource,
};