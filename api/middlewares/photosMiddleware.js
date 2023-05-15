const multer = require("multer");
const path = require("path");

const photosMiddleware = multer({
  dest: "uploads/",
});
module.exports = photosMiddleware;
