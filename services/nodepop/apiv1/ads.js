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
 * GET /ads/tags
 * List tags (only used ones in ads)
 */
router.get('/tags', async function(req, res, next) {
    const tags = await manager.listUsedTags();
    res.json({ success: true, result: tags});
});

module.exports = router;
