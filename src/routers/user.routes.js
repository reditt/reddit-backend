const express = require("express");
const { signIn, signUp } = require("../controllers/user.controller");
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

module.exports = router;
