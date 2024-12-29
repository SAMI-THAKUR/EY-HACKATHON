const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const verifyJWT = async (req, res, next) => {
  try {
    console.log("in verifyJWT");
    console.log(req.cookies);
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Unauthorized request");
    }

    const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || "your_secret_key";
    const decodedToken = jwt.verify(token, accessTokenSecret);

    if (!decodedToken.id) {
      throw new Error("Invalid token");
    }

    const newUser = await db.user.findUnique({
      where: { id: decodedToken.id },
      select: { id: true, email: true },
    });

    if (!newUser) {
      throw new Error("Unauthorized request");
    }

    req.user = newUser;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = verifyJWT;
