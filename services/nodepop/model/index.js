'use strict';

const NPError = require('./error');

const User = require('./data/User');
const Ad = require('./data/Ad');
const Tag = require('./data/Tag');

const manager = {

    // Users Management
    createUser: (data) => {
        try {
		return(User.createUser(data));
        } catch(excp) {
		throw(NPError.create(excp));
        }
    },
    authenticateUser: async (email, password) => {

	/* check */
	if (!email || !password)
		throw(new NPError.InvalidParametersError());

	/* try */
        try {
		const user = await User.findByEmail(email);

		/* check */
		if (!user)
			throw(new NPError.InvalidCredentialsError());
		if (!user.isSamePassword(password))
			throw(new NPError.InvalidCredentialsError());

		/* done */
		return(user);

        } catch(excp) {
		throw(NPError.create(excp));
        }
    },

    // Ads Management
    listAds: async (filters = {}, limit, skip = 0, sort, select = "_id") => {
	return(await Ad.list(filters, limit, skip, sort, select));
    },
    getAd: async (id) => {
        try {
		return(await Ad.findById(id).exec());
        } catch(excp) {
		throw(NPError.create(excp));
        }
    },
    setAd: async (id, data) => {
        try {
		return(await Ad.findByIdAndUpdate(id, data, { new: true }).exec());
        } catch(excp) {
		throw(NPError.create(excp));
        }
    },
    deleteAd: async (id) => {
        try {
		return(await Ad.findByIdAndRemove(id).exec());
        } catch(excp) {
		throw(NPError.create(excp));
        }
    },

    // Tags Management
    listUsedTags: async () => {
        return(await Ad.listTags());
    },
    listTags: async () => {
        return(await Tag.list());
    }
}

module.exports = manager;
