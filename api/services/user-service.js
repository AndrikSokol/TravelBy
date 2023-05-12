const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);

class UserService {
  async login(email, password) {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (!passOk) {
        throw new Error("pass not ok");
      }
      return {
        token: jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          process.env.JWT_SECRET
        ),
        userDoc,
      };
    }
  }

  async registration(username, email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new Error("Пользователь уже существует");
    }
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    return userDoc;
  }

  async profile(token) {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const { username, email, _id } = await User.findById(userData.id);
        return { username, email, _id };
      });
    }
  }
}

module.exports = new UserService();
