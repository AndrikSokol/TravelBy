const Router = require("express").Router;
const UserController = require("../controllers/user-controller");
const PlaceController = require("../controllers/place-controller");
const ImageController = require("../controllers/image-controller");
const photosMiddleware = require("../middlewares/photosMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();
const { body } = require("express-validator");

router.post("/registration", body("email").isEmail(), body("password").isLength({ min: 3, max: 30 }), UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/profile", authMiddleware, UserController.profile);
router.get("/places-for-user", authMiddleware, PlaceController.findUserPlaces);
router.get("/place/:id", PlaceController.getPlace);
router.post("/place", authMiddleware, PlaceController.addPlace);
router.put("/place", authMiddleware, PlaceController.removePlace);
router.put("/places", authMiddleware, PlaceController.editPlace);
router.get("/places", PlaceController.getPlaces);
router.post("/upload-by-link", authMiddleware, ImageController.uploadByLink);
router.post("/upload-by-device", authMiddleware, photosMiddleware.array("photos", 100), ImageController.uploadByDevice);

module.exports = router;
