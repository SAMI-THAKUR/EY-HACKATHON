const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const db = new PrismaClient(); // Added initialization

const isTokenExpired = (token) => {
  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return false;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return true;
    } else {
      console.error("Token verification error:", error);
      return true;
    }
  }
};

const generateAccessAndRefreshTokens = async (id) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: { id: true, email: true, refreshToken: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let refreshToken = user.refreshToken;

    if (!refreshToken || isTokenExpired(refreshToken)) {
      refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "24hr" }
      );

      await db.user.update({
        where: { id },
        data: { refreshToken },
      });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generating tokens:", error);
    throw new Error("Error in generating tokens");
  }
};

const RegisterController = async (req, res) => {
  try {
    const { email, username, password } = req.body; // Extracted username
    const existingUser = await db.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      throw new Error("Email or username already taken");
    }

    const newUser = await db.user.create({
      data: {
        email: email,
        password: password,
        username: username, // Included username
      },
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      newUser.id
    );
    const loggedInUser = await db.user.update({
      where: { id: newUser.id },
      data: { refreshToken },
      select: { id: true, email: true },
    });
    const options = {
      httpOnly: true,
      secure: true,
      samesite: "None",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ success: true, user: loggedInUser, accessToken });
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user.id
    );
    const loggedInUser = await db.user.update({
      where: { id: user.id },
      data: { refreshToken },
      select: { id: true, email: true },
    });
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ success: true, user: loggedInUser, accessToken });
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const LogoutController = async (req, res) => {
  try {
    await db.user.update({
      where: { id: req?.user?.id },
      data: { refreshToken: null },
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in user logout:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const RefreshAccessTokenController = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "No refresh token provided" });
    }

    if (isTokenExpired(incomingRefreshToken)) {
      return res
        .status(400)
        .json({ success: false, message: "Refresh token expired" });
    }

    const decodedToken = jwt.decode(incomingRefreshToken);

    const user = await db.user.findUnique({
      where: { id: decodedToken.id },
      select: { id: true, email: true, refreshToken: true },
    });

    if (!user || user.refreshToken !== incomingRefreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid refresh token" });
    }

    const options = {
      httpOnly: true,
      secure: true,
      samesite: "None",
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user.id
    );

    const loggedInUser = await db.user.update({
      where: { id: user.id },
      data: { refreshToken },
      select: { id: true, email: true },
    });

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ success: true, user: loggedInUser, accessToken });
  } catch (error) {
    console.error("Error in refreshing access token:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const validateToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;
    const incomingAccessToken = req.cookies.accessToken;

    if (!incomingRefreshToken || !incomingAccessToken) {
      return res.status(400).json({
        success: false,
        message: "No refresh token or access token provided",
      });
    }

    if (isTokenExpired(incomingRefreshToken)) {
      return res
        .status(400)
        .json({ success: false, message: "Refresh token expired" });
    }

    if (isTokenExpired(incomingAccessToken)) {
      return RefreshAccessTokenController(req, res);
    }

    const decodedAccessToken = jwt.verify(
      incomingAccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await db.user.findUnique({
      where: { id: decodedAccessToken.id },
      select: { id: true, email: true, username: true, refreshToken: true },
    });

    if (!user || user.refreshToken !== incomingRefreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid refresh token" });
    }

    req.user = decodedAccessToken;

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in validating token:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateAccessAndRefreshTokens,
  isTokenExpired,
  RegisterController,
  LoginController,
  LogoutController,
  RefreshAccessTokenController,
  validateToken,
};
