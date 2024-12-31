const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const eventRoutes = require("./routes/event.route");
const skillsRoutes = require("./routes/skills.route");
const learningRoutes = require("./routes/learning.route");
const careerPathRoutes = require("./routes/career_path.route");
require("./auth/googleStrategy.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

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
app.use("/event", eventRoutes);
app.use("/skills", skillsRoutes);
app.use("/learning", learningRoutes);
app.use("/career-path", careerPathRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to SIH-2024 Backend");
});

// Connect to Prisma and start the server
prisma.$connect()
  .then(() => {
    console.log("Database connected.");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

