"use strict";

const jwt = require("jsonwebtoken");

const config = require("config");

module.exports = {

	// Sign In User
	signInUser: (user, cb) => { jwt.sign({ _id: user._id }, config.JWT_SECRET, { expiresIn: "1d" }, cb); },

	// Verify Token
	verifyToken: (token, cb) => { jwt.verify(token, config.JWT_SECRET, cb); }
};
module.exports.authorization = require("./authorization");
