"use strict";

const mongoose = require("./_DataSource");

// Tag Schema
const schema = mongoose.Schema({
	name: { type: String, index: true, unique: true }
});
schema.statics.list = () => {
	const query = Tag.find({});
	return(query.exec());
};

// Tag Model
const Tag = mongoose.model("Tag", schema);
module.exports = Tag;
