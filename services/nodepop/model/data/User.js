"use strict";

const mongoose = require("./_DataSource");
const bcrypt = require("bcrypt");

// User Schema
const schema = mongoose.Schema({
	name:		{ type: String, required: true },
	email:		{ type: String, required: true, index: true, unique: true, lowercase: true },
	password:	{ type: String, required: true },
	created:	{ type: Date, default: Date.now }
});
schema.statics.createUser = (data) => {

	/* set */
	const user = new User(data);
	user.password = bcrypt.hashSync(data.password, 10);

	/* done */
	return(user.save());
};
schema.statics.findByEmail = (email) => {
	const query = User.findOne({ email });
	return(query.exec());
};
schema.methods.isSamePassword = function isSamePassword(password) {
	return(bcrypt.compareSync(password, this.password));
};

// User Model
const User = mongoose.model("User", schema);
module.exports = User;
