const UserModel = require("../models/user.model");
const SendEmail = require("../utlis/mail");
const createOtp = require("../utlis/Otp");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sinup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  if (!(password.length >= 8 && password.length < 16)) {
    return res.status(400).json({ error: "Password must be between 8 and 16" });
  }

  try {
    const User = await UserModel.findOne({ email });
    if (User) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const { token, otp } = createOtp({ name, email, password });

    const htmltemplate = await ejs.renderFile(
      __dirname + "/../views/email.ejs",
      { name, otp }
    );

    console.log(otp);
    // await SendEmail(email, htmltemplate);
    res
      .cookie("Verification_Token", token)
      .status(200)
      .json({ message: "please verify your otp" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const verification = (req, res) => {
  const { otp } = req.body;
  const { Verification_Token } = req.cookies;
  if (!otp && otp.length != 4) {
    return res.status(400).json({ error: "Please enter otp" });
  }

  jwt.verify(
    Verification_Token,
    process.env.privateKey_Verfication,
    async function (err, decoded) {
      if (err) {
        return res.status(400).json({ error: "Invalid token" });
      }
      const { user, otpGenerator } = decoded;
      if (otpGenerator != otp) {
        return res.status(400).json({ error: "Invalid otp" });
      }
      bcrypt.hash(user.password, 5, async function (err, hash) {
        if (err) {
          return res.status(500).json({ error: "Error hashing password" });
        }
        await UserModel.create({ ...user, password: hash });
        res.status(200).json({ message: "User created successfully" });
      });
    }
  );
};

const singin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "please register" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(500).json({ error: "Error comparing password" });
      }

      if (!result) {
        return res.status(400).json({ error: "Invalid password" });
      }

      const { password, ...rest } = user._doc;

      var token = jwt.sign({ userdata: rest }, "zxcvbnm");
      if (!token) {
        return res.status(500).json({ error: "Error generating token" });
      }

      res
        .cookie("Access_Token", token)
        .status(200)
        .json({ message: "Login Successfully", user: rest });
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const logout = (req, res) => {
  res
    .clearCookie("Access_Token")
    .status(200)
    .json({ message: "Logout successfully" });
};

const getuser = async (req, res) => {
  const user = req.user;

  if (user._id !== req.params.userId) {
    return res.status(400).json({ error: "Invalid user" });
  }

  try {
    const userdata = await UserModel.findOne({ _id: req.params.userId });
    const { password, ...rest } = userdata._doc;
    res.status(200).json({ message: "date get succesfully", data: rest });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { filename } = req.file;

  if (req.body.email || req.body.password || req.body.admin) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const updateduser = await UserModel.findByIdAndUpdate(req.params.userId, {
      $set: { ...req.body, profileImage: filename },
    });

    const { password, ...rest } = updateduser._doc;
    res.status(200).json({ message: "updated succesfully", data: rest });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Admine Controller
const getusers = async (req, res) => {
  const limit = req.query.limit || 10;
  const skip = req.query.skip || 0;
  const sort = req.query.sort == "asc" ? -1 : 1;

  try {
    const usersdata = await UserModel.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: sort });
    if (!usersdata) {
      return res.status(400).json({ error: "No users found" });
    }
    res.status(200).json({ message: "users get succesfully", data: usersdata });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteuserbyadmine = async (req, res) => {
  try {
    const user = UserModel.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const deleteduser = await UserModel.findByIdAndDelete(req.params.userId);
    res
      .status(200)
      .json({ message: "User deleted succesfully", data: deleteduser });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  Sinup,
  verification,
  singin,
  logout,
  getuser,
  update,
  getusers,
  deleteuserbyadmine,
};
