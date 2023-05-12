const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const multer = require("multer");
const imageDownloader = require("image-downloader");
const fs = require("fs");

require("dotenv").config();
const app = express();

const router = require("./router/index.js");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: process.env.API_URL,
  })
);
app.use(router);

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

photosMiddleware = multer({ dest: "uploads/" });
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
