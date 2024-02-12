const Router = require("express").Router;
const UserController = require("../controllers/user-controller");
const PlaceController = require("../controllers/place-controller");
const ImageController = require("../controllers/image-controller");
const photosMiddleware = require("../middlewares/photosMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const passportMiddleware = require("../middlewares/passportMiddleware");
const router = new Router();
const passport = require("passport");
const { body } = require("express-validator");
require("dotenv").config();
// const qr = require("qr-image");
const qrcode = require("qrcode");
const userService = require("../services/user-service");
const speakeasy = require("speakeasy");
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 30 }),
  UserController.registration
);


router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/profile", authMiddleware, UserController.profile);
router.get("/places-for-user", authMiddleware, PlaceController.findUserPlaces);
router.get("/place/:id", PlaceController.getPlace);
router.get("/places/:keywordsFilter", PlaceController.getFilterPlaces);
router.post("/place", authMiddleware, PlaceController.addPlace);
router.put("/place", authMiddleware, PlaceController.removePlace);
router.put("/places", authMiddleware, PlaceController.editPlace);
router.get("/places", PlaceController.getPlaces);
router.post("/upload-by-link", authMiddleware, ImageController.uploadByLink);
router.post(
  "/upload-by-device",
  authMiddleware,
  photosMiddleware.array("photos", 100),
  ImageController.uploadByDevice
);

// router.get("/auth/google", passportMiddleware({ scope: ["profile", "email"] }), (req, res) => {
//   // Your route logic goes here
// });

// router.get(
//   "/auth/google/callback",
//   passportMiddleware(
//     { successRedirect: process.env.API_URL, failureRedirect: "/login" },
//     (req, res) => {
//       // Your route logic goes here
//     }
//   )
// );
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback route where Google redirects after successful authentication
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.API_URL, // Redirect to your application's dashboard on success
    failureRedirect: "/login/failed", // Redirect to login page on failure
  })
);

router.get("/login/failed", (req, res, next) => {
  return next(ApiError.UnauthorizedError);
});

router.get("/login/success", (req, res, next) => {
  try {
    const userData = req.user;
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
});

// const isValid = speakeasy.totp.verify({
//         secret: secret.value,
//         encoding: 'base32',
//         token: ${token},
//       });
// router.get("/qr", (req, res) => {
//   const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=422703098795-qof71930mtk1rj7otmjboipkc64a28g1.apps.googleusercontent.com&redirect_uri=http://localhost:4500/auth/google/callback&scope=profile+email&response_type=code`;

//   const code = qr.image(googleAuthURL, { type: "png" });

//   const chunks = [];
//   code.on("data", (chunk) => {
//     chunks.push(chunk);
//   });

//   code.on("end", () => {
//     const qrCodeImage = Buffer.concat(chunks);
//     const base64QRCode = qrCodeImage.toString("base64");
//     const dataUri = `data:image/png;base64,${base64QRCode}`;

//     // Send the base64-encoded image as data URI in the response
//     res.send(dataUri);
//   });
// });

router.get("/getQrCode/:email", async (req, res) => {
  email = req.params.email;
  const secret = await userService.findSecret(email);
  qrcode.toDataURL(`${secret.otpauth_url}`, (err, data) => {
    res.json(data);
  });
});

router.get("/verify2fa/:code&:email", async (req, res) => {
  console.log(req.params);
  const code = req.params.code;
  const email = req.params.email;

  const secret = await userService.findSecret(email);
  console.log(secret.value);
  const isValid = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: "base32",
    token: code,
  });
  return res.json(isValid);
});

module.exports = router;
