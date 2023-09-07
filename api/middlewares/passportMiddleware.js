const passport = require("passport");

const passportMiddleware = (props) => {
  passport.authenticate("google", props);
};

module.exports = passportMiddleware;
