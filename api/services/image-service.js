const imageDownloader = require("image-downloader");
const fs = require("fs");

class ImageService {
  async uploadByLink(link, newName) {
    const img = await imageDownloader
      .image({
        url: link,
        dest: __dirname + "/uploads/" + newName,
      })
      .then(({ filename }) => console.log("saved to", filename));
    return img;
  }

  async uploadByDevice() {
    // for (let i = 0; i < req.files.length; i++) {
    //     const { path, originalname } = req.files[i];
    //     const parts = originalname.split(".");
    //     const ext = parts[parts.length - 1];
    //     const newPath = path + "." + ext;
    //     fs.renameSync(path, newPath);
    //     uploadedFiles.push(newPath.replace("uploads\\", ""));
    //   }
  }
}

module.exports = new ImageService();
