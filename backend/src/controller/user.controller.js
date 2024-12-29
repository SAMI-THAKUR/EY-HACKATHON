const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

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

module.exports = {
  getUser,
};
