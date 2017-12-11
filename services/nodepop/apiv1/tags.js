'use strict';

const express = require('express');
const router = express.Router();

const manager = require('services/nodepop/model');
const NPError = require('services/nodepop/model/error');

const authorization = require('services/nodepop/helpers/security').authorization;

/********** AUTHORIZATION ************/
router.use(authorization.handler());
/*************************************/


/**
 * GET /tags
 * List tags (all of them)
 */
router.get('/', async function(req, res, next) {
    const tags = await manager.listTags();
    res.json({ success: true, result: tags});
});

module.exports = router;
