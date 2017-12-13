"use strict";

const APP_LOG = require("debug")("nodepop:app");

const TXW = require("lib/txw");

var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// No 'favicon'
app.get("/favicon.ico", function(req, res) {
	res.status(204);
});

// Services
app.use("/nodepop/apiv1/ads", require("./services/nodepop/apiv1/ads"));
app.use("/nodepop/apiv1/tags", require("./services/nodepop/apiv1/tags"));
app.use("/nodepop/apiv1/users", require("./services/nodepop/apiv1/users"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res) {
	const lang	= req.body.lang || req.query.lang || req.get("Accept-Language");
	const message	= TXW.isDefined(err.getI18NMessage) ? err.getI18NMessage(lang) : err.message;

	/* */
	APP_LOG("<Error #" + err.code + "> '" + message + "'");

	/* response */
	res.status(err.status || 500);
	res.json({ success: false, error: { code: err.code, message, internal: (req.app.get("env") === "development" ? err.error : {}) } });
});

module.exports = app;
