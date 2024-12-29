const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const { generateAccessAndRefreshTokens } = require("../controller/auth.controller");
const prisma = new PrismaClient();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true, // Enable request object passing
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (user) {
          const tokens = await generateAccessAndRefreshTokens(user.id);
          req.tokens = tokens; // Attach tokens to req object
          return done(null, user);
        } else {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              username: profile.displayName,
              thumbnail: profile._json.picture,
              email: profile.emails[0].value,
            },
          });
          const tokens = await generateAccessAndRefreshTokens(user.id);
          req.tokens = tokens; // Attach tokens to req object
          return done(null, user);
        }
      } catch (err) {
        done(err, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
