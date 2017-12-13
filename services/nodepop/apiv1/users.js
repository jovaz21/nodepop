"use strict";

const debug = require("debug")("nodepop:apiv1");

const express = require("express");
const router = express.Router();

const manager = require("services/nodepop/model");
const NPError = require("services/nodepop/model/error");

const security = require("services/nodepop/helpers/security");

/**
 * POST /users
 * Register a new user
 */
router.post("/", async function(req, res, next) {
	try {
		const name	= req.body.name;
		const email	= req.body.email;
		const password	= req.body.password;

		/* */
		debug("<POST '/users'> handler: Entering, name='" + name + "', email='" + email + "'...");

		/* check */
		if (!name || !email || !password) {
			debug("<POST '/users'> handler: Done (Missing Parameters)");
			throw(new NPError.InvalidParametersError());
		}

		/* create */
		const user = await manager.createUser({ name, email, password });

		/* done */
		debug("<POST '/users'> handler: Done, userId='" + user._id + "'");
		res.json({ success: true, result: { 
			_id:		user._id,
			name:		user.name,
			email:		user.email,
			created:	user.created
		} });

	} catch(excp) {
		debug("<POST '/users'> handler: Done (Exception Caught)\n%o", excp);
		next(NPError.create(excp));
	}
});

/**
 * POST /users/authenticate
 * Authenticate a user
 */
router.post("/authenticate", async function(req, res, next) {
	try {
		const email	= req.body.email;
		const password	= req.body.password;

		/* */
		debug("<POST '/users/authenticate'> handler: Entering, email='" + email + "'...");

		/* check */
		if (!email || !password) {
			debug("<POST '/users/authenticate'> handler: Done (Missing Parameters)");
			throw(new NPError.InvalidParametersError());
		}

		/* authenticate */
		const user = await manager.authenticateUser(email, password);

		/* check */
		if (!user) {
			debug("<POST '/users/authenticate'> handler: Done (Invalid Credentials)");
			throw(new NPError.InvalidCredentialsError());
		}

		/* done */
		security.signInUser(user, (err, token) => {
			if (err) {
				debug("<POST '/users/authenticate'> handler: Done (SignIn Error)");
				next(NPError.create(err));
				return;
			}
			debug("<POST '/users/authenticate'> handler: Done, token='" + token + "'");
			res.json({ success: true, result: { token } });
		});

	} catch(excp) {
		debug("<POST '/users/authenticate'> handler: Done (Exception Caught)\n%o", excp);
		next(NPError.create(excp));
	}
});

module.exports = router;
