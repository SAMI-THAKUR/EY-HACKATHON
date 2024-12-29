const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
require("./auth/googleStrategy.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT;
const allowedHosts = process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(",") : [];

app.use(
  cors({
    origin: allowedHosts,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to SIH-2024 Backend");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
