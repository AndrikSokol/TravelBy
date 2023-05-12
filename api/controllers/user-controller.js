const userService = require("../services/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const userDoc = await userService.registration(username, email, password);
      res.json(userDoc);
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { token, userDoc } = await userService.login(email, password);
      res.cookie("token", token).json(userDoc);
    } catch (error) {
      console.log("login\n" + error);
    }
  }

  async logout(req, res, next) {
    try {
      res.cookie("token", "").json(true);
    } catch (error) {}
  }

  async profile(req, res, next) {
    try {
      const { token } = req.cookies;
      const user = userService.profile(token);
      console.log(...user);
      res.json(...user);
    } catch (error) {}
  }
}

module.exports = new UserController();
