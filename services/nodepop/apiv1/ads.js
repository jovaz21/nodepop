"use strict";

const debug = require("debug")("nodepop:apiv1");

const express = require("express");
const router = express.Router();

const TXW = require("lib/txw");

const manager = require("services/nodepop/model");

const authorization = require("services/nodepop/helpers/security").authorization;

/********** AUTHORIZATION ************/
router.use(authorization.handler());
/*************************************/

/**
 * GET /ads
 * List ads
 */
router.get("/", async function(req, res) {
	const name	= req.query.name;
	const type	= req.query.type;
	const tag	= req.query.tag;
	const range	= req.query.range;

	/* */
	debug("<GET '/ads'> handler: Entering, name='" + name + "', type='" + type + "', tag='" + tag + "', range='" + range + "'...");

	/* set */
	const limit 	= TXW.utils.StringUtils.parseInt(req.query.limit, 0);
	const skip  	= TXW.utils.StringUtils.parseInt(req.query.skip, 0);
	const sort  	= req.query.sort;
	const select	= req.query.select || "_id type article.photo article.name article.description amount contact.type contact.nickname";

	/* list */
	let filters = { status: "published" };
	filters = TXW.applyIf(filters, ((name)	? { "article.name":	new RegExp("^" + name, "i")	} : {}));
	filters = TXW.applyIf(filters, ((type)	? { type:		type				} : {}));
	filters = TXW.applyIf(filters, ((tag)	? { tags:		{ "$in": [tag] }		} : {}));
	filters = TXW.applyIf(filters, ((range)	? { amount:		router.getRange(range)		} : {}));
	const ads = await manager.listAds(filters, limit, skip, sort, select);

	/* done */
	debug("<GET '/ads'> handler: Done (#" + ads.length + " Ads Found)");
	res.json({ success: true, result: ads });
});
router.getRange = function(rangeStr) { const range = rangeStr.split("-");
	let res = {};

	/* check */
	if (range.length === 1)
		res = TXW.utils.StringUtils.parseInt(rangeStr, { "$gte": 0 });
	else {
		let	rangeMin = TXW.utils.StringUtils.parseInt(range[0], 0);
		let	rangeMax = TXW.utils.StringUtils.parseInt(range[1]);

		/* check */
		if (TXW.isDefined(rangeMin) && TXW.isDefined(rangeMax)) {
			if (rangeMin > rangeMax) {
				const swap = rangeMax;
				rangeMax = rangeMin;
				rangeMin = swap;
			}
		}

		/* set */
		res = TXW.applyIf(res, (TXW.isDefined(rangeMin) ? { "$gte": rangeMin } : {}));
		res = TXW.applyIf(res, (TXW.isDefined(rangeMax) ? { "$lte": rangeMax } : {}));
	}

	/* done */
	return(res);
};

/**
 * GET /ads/tags
 * List tags (only used ones in ads)
 */
router.get("/tags", async function(req, res) {
	debug("<GET '/ads/tags'> handler: Entering...");
	const tags = await manager.listUsedTags();
	debug("<GET '/ads/tags'> handler: Done (#" + tags.length + " Tags Found)");
	res.json({ success: true, result: tags });
});

module.exports = router;
