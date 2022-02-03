const db = require("../config/db.config");
const jwt = require("jsonwebtoken");
const { User } = require("../config/db.config");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { mailTemplate } = require("../static/mail");

const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false,
  service: "gmail",
  auth: {
    user: "investorkenwilliams@gmail.com",
    pass: "Leo@1234", // generated ethereal password
  },
});

exports.signUp = async (req, res) => {
  try {
    let input = req.body;
    let user = await db.User.findOne({
      where: {
        email: input.email,
      },
    });
    if (user) {
      return res.status(400).json({ error: "email already exists" });
    }
    const oldUser = await db.User.findAll({
      where: {
        name: input.name,
      },
    });
    let userName = input.name.replace(/ /g, "_");
    if (oldUser?.length) {
      userName = userName + oldUser.length;
    }
    input.userName = userName;
    let data = await db.User.create(input);
    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET
    );
    data.encryptedPassword = undefined;
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
    user.encryptedPassword = undefined;
    return res
      .status(200)
      .json({ message: "Successfully signedIn", token, user });
  } catch (error) {
    res.status(400).json({ error: "something went wrong" + error });
  }
};

exports.checkUserName = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        userName: req.query.userName,
      },
    });
    if (user) {
      return res.status(200).json({ error: "user name already used" });
    } else {
      return res.status(200).json({ message: "user name available" });
    }
  } catch (error) {
    return res.status(400).json({ message: "something went wrong " + error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let input = req.body;
    if (req.user.id !== input.id) {
      return res.status(401).json({ error: "Unauthorized  access" });
    }
    const user = await db.User.findOne({
      where: {
        userName: input.userName,
      },
    });
    if (user && user.id !== req.user.id) {
      return res.status(401).json({ error: "user name already in use" });
    }
    const result = await req.user.update(input, {
      where: {
        id: req.user.id,
      },
    });
    res.status(200).json(input);
  } catch (error) {
    return res.status(400).json({ message: "something went wrong " + error });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    let user = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "user does not exist" });
    }
    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 300,
    });
    await transporter.sendMail({
      from: "investorkenwilliams@gmail.com",
      to: user.email,
      subject: "Forgot Password",
      html: mailTemplate(token),
    });
    return res.status(200).json({ message: "mail sent " });
  } catch (error) {
    return res.status(400).json({ error: "something went wrong " + error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const result = req.user.update(
      {
        encryptedPassword: req.body.encryptedPassword,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: "something went wrong " + error });
  }
};

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await db.User.findOne({
      attributes: { exclude: ["encryptedPassword"] },
      where: {
        id,
      },
    });
    if (user) {
      req.userData = user;
      next();
    } else {
      return res.status(401).json({ message: "Invalid user" });
    }
  } catch (error) {
    return res.status(400).json({ error: "something went wrong " + error });
  }
};

exports.userJoins = async (req, res) => {
  try {
    const joins = await db.CommunityJoin.findAll({
      where: {
        userId: req.user.id,
      },
      attributes: [],
      include: [
        {
          model: db.Community,
          as: "join_community",
          attributes: { exclude: ["createdAt", "updatedAt", "adminId"] },
        },
      ],
    });
    return res.status(200).json({ data: joins });
  } catch (error) {
    return res.status(400).json({ error: "something went wrong " + error });
  }
};
