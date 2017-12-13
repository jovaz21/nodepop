"use strict";

const debug = require("debug")("nodepop:model");

const mongoose = require("mongoose");

// Setup
mongoose.Promise = global.Promise;

// Connect to Database ($MONGODB_URI)
const conn = mongoose.connection;
conn.on("error", function(err) {
	debug("mongodb connection error", err);
});
conn.once("open", () => {
	debug("Connected to mongodb '" + mongoose.connection.name + "'");
});
mongoose.connect("mongodb://" + process.env.MONGODB_URI, { useMongoClient: true });

module.exports = mongoose;
