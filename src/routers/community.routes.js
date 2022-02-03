const express = require("express");
const {
  createCommunity,
  checkCommunityName,
  allCommunities,
  getCommunityByID,
  joinCommunity,
  leaveCommunity,
} = require("../controllers/community.controller");
const {
  validateToken,
  validateUser,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/community", validateToken, validateUser, createCommunity);
router.get("/community", allCommunities);
router.get(
  "/community/checkname",
  validateToken,
  validateUser,
  checkCommunityName
);

router.param("communityName", getCommunityByID);
router.get("/community/:communityName", (req, res) =>
  res.status(200).json({ data: req.community })
);
router.get(
  "/community/:communityName/join",
  validateToken,
  validateUser,
  joinCommunity
);
router.delete(
  "/community/:communityName/join",
  validateToken,
  validateUser,
  leaveCommunity
);

module.exports = router;
