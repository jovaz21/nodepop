'use strict';

const express = require('express');
const router = express.Router();

const manager = require('../model');

/**
 * GET /tags
 * List tags (all of them)
 */
router.get('/', async function(req, res, next) {
    const tags = await manager.listTags();
    res.json({ success: true, result: tags});
});

module.exports = router;
