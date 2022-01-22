const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
    let user = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).json({ error: "email already exists" });
    }
    let data = await db.User.create(req.body);
    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET
    );
    return res.status(201).json({ data, token });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" + error });
  }
};
exports.signIn = async (req, res) => {
  try {
    let user = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const result = await user.validPassword(
      req.body.password,
      user.encryptedPassword
    );
    if (!result) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ message: "Successfully signedIn", token, user });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" + error });
  }
};
