const jsonwebtoken = require("jsonwebtoken");
const db = require("../config/db.config");
require("dotenv").config();

exports.validateToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }
    let decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken?.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.validateUser = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      attributes: { exclude: ["encryptedPassword"] },
      where: {
        id: req.userId,
      },
    });
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Invalid user" });
    }
  } catch (error) {}
};
