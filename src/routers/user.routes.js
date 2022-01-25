const express = require("express");
const {
  signIn,
  signUp,
  checkUserName,
  updateUser,
  resetPassword,
  forgotPassword,
} = require("../controllers/user.controller");
const {
  validateToken,
  validateUser,
} = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/private", validateToken, validateUser, (req, res) =>
  res.json({ message: "success", user: req.user })
);
router.get("/username", validateToken, validateUser, checkUserName);
router.put("/user", validateToken, validateUser, updateUser);
router.post("/forgotPassword", forgotPassword);
router.put("/resetpassword", validateToken, validateUser, resetPassword);

module.exports = router;
