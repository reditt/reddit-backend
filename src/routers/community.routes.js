const express = require("express");
const {
  createCommunity,
  checkCommunityName,
  allCommunities,
} = require("../controllers/community.controller");
const {
  validateToken,
  validateUser,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/community", validateToken, validateUser, createCommunity);
router.get("/community", validateToken, validateUser, allCommunities);
router.get(
  "/community/checkname",
  validateToken,
  validateUser,
  checkCommunityName
);

module.exports = router;
