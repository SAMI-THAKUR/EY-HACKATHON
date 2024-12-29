const express = require("express");
const userRouter = express.Router();
const { getUser } = require("../controller/user.controller");

userRouter.get("/getuser", getUser);

module.exports = userRouter;
