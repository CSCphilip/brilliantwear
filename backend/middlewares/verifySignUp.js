const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const existingUsernameUser = await User.findOne({
      username: req.body.username,
    }).exec();
    if (existingUsernameUser) {
      return res
        .status(400)
        .send({ message: "Failed! Username is already in use!" });
    }

    const existingEmailUser = await User.findOne({
      email: req.body.email,
    }).exec();
    if (existingEmailUser) {
      return res
        .status(400)
        .send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
