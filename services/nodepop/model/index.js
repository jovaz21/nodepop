'use strict';

const Ad = require('./data/Ad');
const Tag = require('./data/Tag');

const manager = {

    // Ads Management
    listAds: async (filters = {}, limit, skip = 0, sort, select = "_id") => {
        return(await Ad.list(filters, limit, skip, sort, select));
    },
    getAd: async (id) => {
        try {
            return(await Ad.findById(id).exec());
        } catch(excp) {
            throw(excp);
        }
    },
    setAd: async (id, data) => {
        try {
            return(await Ad.findByIdAndUpdate(id, data, { new: true }).exec());
        } catch(excp) {
            throw(excp);
        }
    },
    deleteAd: async (id) => {
        try {
            return(await Ad.findByIdAndRemove(id).exec());
        } catch(excp) {
            throw(excp);
        }
    },

    // Tags Management
    listTags: async () => {
        return(await Tag.list());
    }
}

module.exports = manager;
