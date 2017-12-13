'use strict';

const debug = require('debug')('nodepop:model');

const NPError = require('./error');

const User = require('./data/User');
const Ad = require('./data/Ad');
const Tag = require('./data/Tag');

const manager = {

    // Users Management
    createUser: (data) => { debug("<manager> createUser: data=%o", data);
        try {
		return(User.createUser(data));
        } catch(excp) {
		throw(NPError.create(excp));
        }
    },
    getUser: async (id) => { debug("<manager> getUser: id='" + id + "'");
        try {
		return(await User.findById(id).exec());
        } catch(excp) {
		throw(NPError.create(excp));
        }
    },
    authenticateUser: async (email, password) => { debug("<manager> authenticateUser: Entering, email='" + email + "'...");

	/* check */
	if (!email || !password)
		throw(new NPError.InvalidParametersError());

	/* try */
        try {
		const user = await User.findByEmail(email);
		debug("<manager> authenticateUser: Got, user=%o", user);

		/* check */
		if (!user) {
			debug("<manager> authenticateUser: Done (Invalid Email)");
			throw(new NPError.InvalidCredentialsError());
		}
		if (!user.isSamePassword(password)) {
			debug("<manager> authenticateUser: Done (Invalid Password)");
			throw(new NPError.InvalidCredentialsError());
		}

		/* done */
		debug("<manager> authenticateUser: Done");
		return(user);

        } catch(excp) {
		throw(NPError.create(excp));
        }
    },

    // Ads Management
    listAds: async (filters = {}, limit, skip = 0, sort, select = "_id") => {
	debug("<manager> listAds: filters=%o, limit=" + limit + ", skip=" + skip + ", sort=" + sort + ", select='" + select + "'", filters);
	return(await Ad.list(filters, limit, skip, sort, select));
    },
    getAd: async (id) => { debug("<manager> getAd: id='" + id + "'");
        try {
		return(await Ad.findById(id).exec());
        } catch(excp) {
		throw(NPError.create(excp));
        }
    },
    setAd: async (id, data) => { debug("<manager> setAd: id='" + id + "', data=%o", data);
        try {
		return(await Ad.findByIdAndUpdate(id, data, { new: true }).exec());
        } catch(excp) {
		throw(NPError.create(excp));
        }
    },
    deleteAd: async (id) => { debug("<manager> deleteAd: id='" + id + "'");
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
