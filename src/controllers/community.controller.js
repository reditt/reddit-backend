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

exports.joinCommunity = async () => {
  try {
  } catch (error) {
    return res.status(400).json({ message: "something went wrong " + error });
  }
};
