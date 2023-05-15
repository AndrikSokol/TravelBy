const imageDownloader = require("image-downloader");
const fs = require("fs");
const path = require("path");

class ImageService {
  async uploadByLink(link, newName) {
    const img = await imageDownloader
      .image({
        url: link,
        dest: path.join(__dirname, "..", "uploads", newName),
      })
      .then(({ filename }) => console.log("saved to", filename));
    return img;
  }

  async uploadByDevice(files) {
    const uploadedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const { path, originalname } = files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads\\", ""));
    }
    return uploadedFiles;
  }
}

module.exports = new ImageService();
