const imageService = require("../services/image-service");
const multer = require("multer");

class ImageController {
  async uploadByLink(req, res, next) {
    try {
      const { link } = req.body;
      const newName = "photo" + Date.now() + ".jpg";
      const flag = await imageService.uploadByLink(link, newName);
      res.json(newName);
    } catch (error) {
      console.log(error);
    }
  }

  photosMiddleware = multer({ dest: "uploads/" });

  async uploadByDevice(req, res, next) {
    try {
      const files = req.files;
      const uploadedFiles = [];
      console.log(files);
      res.json(uploadedFiles);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ImageController();
