const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
require("dotenv").config();
const app = express();
const multer = require("multer");
const fs = require("fs");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dasfdag";
const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));
app.get("/test", (req, res) => {
  res.json("test OK");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return (
        res.status(400),
        json({ message: "Пользователь с такой почтой уже существует" })
      );
    }
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { username, email, _id } = await User.findById(userData.id);
      res.json({ username, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post(
  "/upload-by-device",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads\\", ""));
    }
    res.json(uploadedFiles);
  }
);

const start = () => {
  try {
    app.listen(PORT, () => console.log("server start on port " + PORT));
  } catch (err) {
    console.log(err);
  }
};

start();
