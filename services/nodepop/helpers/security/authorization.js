"use strict";

const debug = require("debug")("nodepop:helpers");

const manager = require("services/nodepop/model");
const NPError = require("services/nodepop/model/error");

const security = require("./index");

module.exports = {

	// Handler
	handler: () => {

		/* done */
		return(function(req, res, next) {
			const token = req.body.token || req.query.token || req.get("x-access-token");

			/* */
			debug("<authorization> handler: Entering, token='" + token + "'...");

			/* check */
			if (!token) {
				debug("<authorization> handler: Done (No Token Provided)");
				next(new NPError.AuthorizationError("noTokenErrorMsg"));
				return;
			}

			/* check */
			security.verifyToken(token, async (err, decoded) => {
				debug("<authorization> handler: Token Decoded, value=%o", decoded);

				/* check */
				if (err) {
					debug("<authorization> handler: Done (Invalid Token)");
					next(new NPError.AuthorizationError(err));
					return;
				}

				/* check */
				let user = null;
				if ((user = await manager.getUser(decoded._id)) == null) {
					debug("<authorization> handler: Done (User Not Found)");
					next(new NPError.AuthorizationError());
					return;
				}

				/* set */
				req.userId	= decoded._id;
				req.user	= user;

				/* */
				debug("<authorization> handler: Done, userId='" + req.userId + "'");
				next();
			});
		});
	}
};
