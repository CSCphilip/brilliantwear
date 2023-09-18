const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { getJWTSecretKey } = require("../config/auth.config");
const db = require("../models");

const User = db.user;
const Role = db.role;

exports.signup = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    let roles = [];
    if (req.body.roles) {
      roles = await Role.find({
        name: { $in: req.body.roles },
      });
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      roles.push(defaultRole);
    }

    user.roles = roles.map((role) => role._id);
    await user.save();

    res.send({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while registering the user.",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const jwtSecretKey = await getJWTSecretKey();

    const token = jwt.sign({ id: user.id }, jwtSecretKey, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    req.session.token = token;

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
