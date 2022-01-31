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

router.param("communityId", getCommunityByID);
router.get("/community/:communityId", (req, res) =>
  res.status(200).json({ data: req.community })
);
router.get(
  "/community/:communityId/join",
  validateToken,
  validateUser,
  joinCommunity
);
router.delete(
  "/community/:communityId/join",
  validateToken,
  validateUser,
  leaveCommunity
);

module.exports = router;
