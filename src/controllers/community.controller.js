const db = require("../config/db.config");

exports.createCommunity = async (req, res) => {
  try {
    const userId = req.user.id;
    const input = req.body;
    const community = await db.Community.create({ ...input, adminId: userId });
    return res.status(201).json({ community });
  } catch (error) {
    return res.status(400).json({ error: "something went wrong " + error });
  }
};

exports.checkCommunityName = async (req, res) => {
  try {
    const community = await db.Community.findOne({
      where: {
        name: req.query.name,
      },
    });
    if (community) {
      return res.status(400).json({ error: "name already used" });
    } else {
      return res.status(200).json({ message: "name available" });
    }
  } catch (error) {
    return res.status(400).json({ message: "something went wrong " + error });
  }
};

exports.allCommunities = async (req, res) => {
  try {
    const communities = await db.Community.findAll();
    return res.status(200).json({ data: communities });
  } catch (error) {
    return res.status(400).json({ message: "something went wrong " + error });
  }
};

exports.joinCommunity = async (req, res) => {
  try {
    const joined = await db.CommunityJoin.findOne({
      where: {
        userId: req.user.id,
        communityId: req.community.id,
      },
    });
    if (joined) {
      return res.status(401).json({ error: "already joined" });
    }
    await db.CommunityJoin.create({
      userId: req.user.id,
      communityId: req.community.id,
    });
    return res.status(200).json({ message: "joined successfully" });
  } catch (error) {
    return res.status(400).json({ message: "something went wrong " + error });
  }
};

exports.getCommunityByID = async (req, res, next, id) => {
  try {
    const community = await db.Community.findOne({
      where: {
        name: id,
      },
    });
    if (community) {
      req.community = community;
      next();
    } else {
      return res.status(401).json({ error: "Community does not exist" });
    }
  } catch (error) {
    return res.status(400).json({ message: "something went wrong " + error });
  }
};

exports.leaveCommunity = async (req, res) => {
  try {
    const result = await db.CommunityJoin.destroy({
      where: {
        userId: req.user.id,
        communityId: req.community.id,
      },
    });
    if (result) {
      return res.status(200).json({ message: "Community leaved successfully" });
    } else {
      return res.status(401).json({ error: "Community not joined yet" });
    }
  } catch (error) {
    return res.status(400).json({ message: "something went wrong " + error });
  }
};
