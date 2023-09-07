const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});

const GoogleUserModel = mongoose.model("GoogleUser", GoogleUserSchema);

module.exports = GoogleUserModel;
