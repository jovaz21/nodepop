"use strict";

const debug = require("debug")("nodepop:apiv1");

const express = require("express");
const router = express.Router();

const manager = require("services/nodepop/model");

const authorization = require("services/nodepop/helpers/security").authorization;

/********** AUTHORIZATION ************/
router.use(authorization.handler());
/*************************************/


/**
 * GET /tags
 * List tags (all of them)
 */
router.get("/", async function(req, res) {
	debug("<GET '/tags'> handler: Entering...");
	const tags = await manager.listTags();
	debug("<GET '/tags'> handler: Done (#" + tags.length + " Tags Found)");
	res.json({ success: true, result: tags});
});

module.exports = router;
