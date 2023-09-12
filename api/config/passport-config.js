var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const GoogleUser = require("../models/GoogleUser");
const TokenService = require("../services/token-service");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: "422703098795-qof71930mtk1rj7otmjboipkc64a28g1.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      let userJson = profile._json;
      let googleUser = await GoogleUser.findOne({ googleId: userJson.sub });
      const tokens = TokenService.generateTokens({ accessToken });
      TokenService.saveToken(userJson.googleId, tokens.refreshToken);

      if (googleUser) return done(null, { googleUser, ...tokens });
      googleUser = new GoogleUser({
        googleId: userJson.sub,
        email: userJson.email,
        username: userJson.name,
        // secretKey: secret,
      });
      await googleUser.save();
      delete googleUser.secretKey;
      return done(null, { googleUser, ...tokens });
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize user data, typically just store the user's ID in the session.
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Deserialize user data, retrieve user from the database based on the stored ID.
  done(null, user);
});
