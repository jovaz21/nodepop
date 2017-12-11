/*!
 * TXW.utils.StringUtils
 * Copyright(c) 2017 TEKISWARE
 */

'use strict';

const TXW = require('lib/txw');

/**
 * Module dependencies.
 * @private
 */
//var methods = require('methods');

/**
 * TXW prototype.
 */
var StringUtils = exports = module.exports = {};

/**
 * Check if str is in list of comma separated strings.
 *
 * @public
 */
StringUtils.isInList = function isInList(listStr, str) {
    let res = false;

    /* set */
    let list = (!listStr) ? [] : listStr.split(',');

    /* scan */
    for (let i = 0; i < list.length; i++) {
        if (list[i] == str) {
            res = true;
            break;
        }
    }

    /* done */
    return(res);
};

/**
 * Parse Integer
 *
 * @public
 */
StringUtils.parseInt = function(value, valueDef) { let res = undefined;

	/* */
	try { res = parseInt(value); } catch(e) { }

	/* check */
	if (!TXW.isDefined(res) || !TXW.isNumber(res))
		res = valueDef;

	/* done */
	return(res);
};
