const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = new PrismaClient();

const getUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "No refresh token provided" });
    }
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await db.user.findUnique({
      where: { id },
      select: { id: true, email: true, username: true },
    });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error getting user by access token:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const createUserPortfolio = async (req, res) => {
  try {
    const { userId, portfolioData } = req.body;

    const portfolio = await db.portfolio.create({
      data: {
        userId,
        data: portfolioData,
      },
    });

    return res.status(201).json({ success: true, portfolio });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getUserPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;

    const portfolio = await db.portfolio.findUnique({
      where: { userId },
      select: { id: true, data: true, createdAt: true, updatedAt: true },
    });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    return res.status(200).json({ success: true, portfolio });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateUserPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    const { portfolioData } = req.body;

    const updatedPortfolio = await db.portfolio.update({
      where: { userId },
      data: { data: portfolioData },
    });

    return res.status(200).json({ success: true, portfolio: updatedPortfolio });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUserPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;

    await db.portfolio.delete({
      where: { userId },
    });

    return res.status(200).json({ success: true, message: "Portfolio deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Create Mock Interview
const createMockInterview = async (req, res) => {
  try {
    const { userId, questions, assessment } = req.body;

    const mockInterview = await db.mockInterview.create({
      data: {
        userId,
        questions,
        assessment,
      },
    });

    return res.status(201).json({ success: true, mockInterview });
  } catch (error) {
    console.error("Error creating mock interview:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Get Mock Interview by ID
const getMockInterview = async (req, res) => {
  try {
    const { id } = req.params;

    const mockInterview = await db.mockInterview.findUnique({
      where: { id },
    });

    if (!mockInterview) {
      return res.status(404).json({ success: false, message: "Mock interview not found" });
    }

    return res.status(200).json({ success: true, mockInterview });
  } catch (error) {
    console.error("Error retrieving mock interview:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Update Mock Interview
const updateMockInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { questions, assessment } = req.body;

    const updatedMockInterview = await db.mockInterview.update({
      where: { id },
      data: { questions, assessment },
    });

    return res.status(200).json({ success: true, mockInterview: updatedMockInterview });
  } catch (error) {
    console.error("Error updating mock interview:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Mock Interview
const deleteMockInterview = async (req, res) => {
  try {
    const { id } = req.params;

    await db.mockInterview.delete({
      where: { id },
    });

    return res.status(200).json({ success: true, message: "Mock interview deleted successfully" });
  } catch (error) {
    console.error("Error deleting mock interview:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// List Mock Interviews
const listMockInterviews = async (req, res) => {
  try {
    const { userId } = req.query;

    const where = userId ? { userId } : {};

    const mockInterviews = await db.mockInterview.findMany({
      where,
    });

    return res.status(200).json({ success: true, mockInterviews });
  } catch (error) {
    console.error("Error listing mock interviews:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Add Skill to User
const addSkillToUser = async (req, res) => {
  const { userId } = req.params;
  const { skillId } = req.body;
  try {
    const userSkill = await db.userSkill.create({
      data: {
        userId,
        skillId,
      },
    });
    return res.status(201).json({ success: true, userSkill });
  } catch (error) {
    console.error("Error adding skill to user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Remove Skill from User
const removeSkillFromUser = async (req, res) => {
  const { userId, skillId } = req.params;
  try {
    await db.userSkill.delete({
      where: {
        userId_skillId: {
          userId,
          skillId,
        },
      },
    });
    return res.status(200).json({ success: true, message: "Skill removed from user" });
  } catch (error) {
    console.error("Error removing skill from user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// New createUser controller
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "Username, email, and password are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "User with this email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// New login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    // Find the user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    // Generate refresh token
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    // Save refresh token in the database
    await db.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ success: true, message: "Logged in successfully." });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  const { userId } = req.params; // Ensure userId is passed as a route parameter
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
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

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user profile." });
  }
};

module.exports = {
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
  login,
  getUserProfile, // Export the new function
};
