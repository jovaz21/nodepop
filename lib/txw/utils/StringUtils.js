/*!
 * TXW.utils.StringUtils
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