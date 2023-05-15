const Router = require("express").Router;
const UserController = require("../controllers/user-controller");
const PlaceController = require("../controllers/place-controller");
const ImageController = require("../controllers/image-controller");
const photosMiddleware = require("../middlewares/photosMiddleware");

const router = new Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/profile", UserController.profile);
router.get("/places-for-user", PlaceController.findUserPlaces);
router.get("/place/:id", PlaceController.getPlace);
router.post("/place", PlaceController.addPlace);
router.put("/place", PlaceController.removePlace);
router.put("/places", PlaceController.editPlace);
router.get("/places", PlaceController.getPlaces);
router.post("/upload-by-link", ImageController.uploadByLink);
router.post(
  "/upload-by-device",
  photosMiddleware.array("photos", 100),
  ImageController.uploadByDevice
);
module.exports = router;
