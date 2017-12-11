'use strict';

const mongoose = require('./_DataSource');

const TXW = require('lib/txw');

// Ad Schema
const schema = mongoose.Schema({
	type:		{ type: String, enum: ['sale', 'purchase'] },
	status:		{ type: String, enum: ['draft', 'published'], default: 'draft' },
	statusDate:	{ type: Date, default: Date.now },
	article: {
	    name:	{ type: String },
	    description:{ type: String },
	    photo:	{ type: String }
	},
	contact: {
	    type:	{ type: String, enum: ['individual', 'professional'] },
	    name:	{ type: String },
	    nickname:	{ type: String },
	    ranking:	{ type: Number, min: 0, max: 5 },
	    phone:	{ type: String },
	    mobile:	{ type: String },
	    email:	{ type: String },
	    country:	{ type: String },
	    street:	{ type: String },
	    city:	{ type: String },
	    zipCode:	{ type: String },
	    zipCode:	{ type: String },
	    web:	{ type: String }
	},
	amount:		{ type: Number },
	stats: {
	    views:	{ type: Number },
	    contacts:	{ type: Number }
	},
	tags:		[String]
});
schema.statics.listTags = () => {
	const ads = mongoose.connection.collection('ads');
	return(ads.distinct("tags"));
};
schema.statics.list = (filters, limit, skip, sort, select) => {
	const query = Ad.find(filters);
	if (TXW.isDefined(limit))
		query.limit(limit);
	if (TXW.isDefined(skip))
		query.skip(skip);
	if (TXW.isDefined(sort))
		query.sort(sort);
	if (TXW.isDefined(select))
		query.select(select);
	return(query.exec());
};

// Ad Model
const Ad = mongoose.model('Ad', schema);
module.exports = Ad;
