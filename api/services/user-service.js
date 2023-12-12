const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenService = require("./token-service");
const UserDto = require("../dtos/UserDto");
const ApiError = require("../exceptions/api-error");
const bcryptSalt = bcrypt.genSaltSync(10);

class UserService {
  async login(email, password) {
    console.log(password)
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      ApiError.BadRequest("Не найден пользователь");
    }
    const passOk = bcrypt.compareSync(password, user.password);
    console.log(passOk);
    if (!passOk) {
      throw ApiError.UnauthorizedError("Не найден пользователь");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async registration(username, email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("Пользователь уже существует");
    }
    const user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  // async profile(token) {
  //   if (token) {
  //     jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
  //       if (err) throw err;
  //       const { username, email, _id } = await User.findById(userData.id);
  //       return { username, email, _id };
  //     });
  //   }
  // }
}

module.exports = new UserService();
