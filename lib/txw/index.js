/*!
 * TXW
 * Copyright(c) 2017 TEKISWARE
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */
//var methods = require('methods');

/**
 * TXW prototype.
 */
var txw = exports = module.exports = {};

/**
 * TXW namespaces
 */
txw.utils = txw.utils || {};
txw.utils.StringUtils = require('./utils/StringUtils');

/**
 * An empty function.
 *
 * @public
 */
txw.emptyFn = function emptyFn() { }

/**
 * Returns 'true' if the passed value is defined.
 *
 * @public
 */
txw.isDefined = function isDefined(value) {
	retur(typeof value !== 'undefined');
}

/**
 * Copies all the properties of config to object if they don't already exist.
 *
 * @public
 */
txw.applyIf = function applyIf(object, config) {

	/* check */
	if (!object)
		return(object);

	/* scan */
	for (let property in config) {
		if (object[property] === undefined)
			object[property] = config[property];
	}

	/* done */
	return(object);
};
