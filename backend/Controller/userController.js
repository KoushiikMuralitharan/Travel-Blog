const User = require("../Modals/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const accessKey = process.env.JWT_SECRET;

function generateToken(userDetail) {
  return jwt.sign(userDetail, accessKey);
}

const addUser = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length === 0) {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      const userDetail = {
        username: user.username,
        email: user.email,
        userId: user._id,
      };

      const accessToken = generateToken(userDetail);
      res.status(200).json({
        status: "Success",
        message: "user account created successfully",
        accessToken: accessToken,
        userDetail: userDetail,
      });
    } else {
      res.status(409).json({
        status: "failed",
        message: "user account already present.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: `user account not created ${error}.`,
    });
  }
};

const validateUser = async (req, res) => {
  try {
    const user = await User.find({
      email: req.body.email,
      password: req.body.password,
    });
    if (user.length === 0) {
      res.status(400).json({
        status: "failure",
        message: "user does not exists.",
      });
    } else {
      console.log(user._id);
      const userDetail = {
        username: user[0].username,
        email: user[0].email,
        password: user[0].password,
        userId: user[0]._id,
        role: user[0].role,
      };

      const accessToken = generateToken(userDetail);
      res.json({
        status: "Success",
        message: "entered into the website",
        accessToken: accessToken,
        userDetail: userDetail,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `No user found ${error}`,
    });
  }
};

module.exports = { addUser, validateUser };
