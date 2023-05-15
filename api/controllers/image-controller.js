const imageService = require("../services/image-service");

class ImageController {
  async uploadByLink(req, res, next) {
    try {
      const { link } = req.body;
      const newName = "photo" + Date.now() + ".jpg";
      await imageService.uploadByLink(link, newName);
      res.json(newName);
    } catch (error) {
      console.log(error);
    }
  }

  async uploadByDevice(req, res, next) {
    try {
      console.log(req.files);
      const files = req.files;
      const uploadedFiles = await imageService.uploadByDevice(files);
      res.json(uploadedFiles);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ImageController();
