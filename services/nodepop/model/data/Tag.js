'use strict';

var mongoose = require('./_DataSource');

// Tag Schema
const tagSchema = mongoose.Schema({
	name: { type: String, index: true, unique: true }
});
tagSchema.statics.list = () => {
	const query = Tag.find({});
	return(query.exec());
};

// Tag Model
const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
