const express = require("express");
const passport = require("../auth/googleStrategy");
const verifyJWT = require("../middleware/auth.middlerware");

const authRouter = express.Router();
const {
  RegisterController,       // Corrected from RegisterControlloer
  LoginController,          // Corrected from LoginControlloer
  LogoutController,
  validateToken,
} = require("../controller/auth.controller");

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const { accessToken, refreshToken } = req.tokens;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.redirect(`${process.env.FRONTEND_URL}/`);
  }
);

authRouter.post("/register", RegisterController);  // Updated reference
authRouter.post("/login", LoginController);        // Updated reference
authRouter.post("/logout", verifyJWT, LogoutController);
authRouter.post("/validate", validateToken);

module.exports = authRouter;
