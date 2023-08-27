const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.session.token;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
};

isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).exec();
        const roles = await Role.find({ _id: { $in: user.roles } }).exec();

        const isAdmin = roles.some(role => role.name === "admin");
        if (isAdmin) {
            next();
        } else {
            res.status(403).send({ message: "Require Admin Role!" });
        }
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).exec();
        const roles = await Role.find({ _id: { $in: user.roles } }).exec();

        const isModerator = roles.some(role => role.name === "moderator");
        if (isModerator) {
            next();
        } else {
            res.status(403).send({ message: "Require Moderator Role!" });
        }
    } catch (err) {
        res.status(500).send({ message: err });
    }
};


const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
};

module.exports = authJwt;
