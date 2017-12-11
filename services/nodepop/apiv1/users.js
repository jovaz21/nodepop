'use strict';

const express = require('express');
const router = express.Router();

const manager = require('services/nodepop/model');
const NPError = require('services/nodepop/model/error');

const security = require('services/nodepop/helpers/security');

/**
 * POST /users
 * Register a new user
 */
router.post('/', async function(req, res, next) {
    try {

	/* set */
        const name	= req.body.name;
        const email	= req.body.email;
        const password	= req.body.password;

	/* check */
	if (!name || !email || !password)
		throw(new NPError.InvalidParametersError());

	/* create */
	const user = await manager.createUser({ name, email, password });

	/* done */
        res.json({ success: true, result: user });

    } catch(excp) {
	console.log("<users> Exception caught, excp=%o", excp);
	next(NPError.create(excp));
    }
});

/**
 * POST /users/authenticate
 * Authenticate a user
 */
router.post('/authenticate', async function(req, res, next) {
    try {

	/* set */
        const email	= req.body.email;
        const password	= req.body.password;

	/* check */
	if (!email || !password)
		throw(new NPError.InvalidParametersError());

	/* authenticate */
	const user = await manager.authenticateUser(email, password);

	/* check */
	if (!user)
		throw(new NPError.InvalidCredentialsError());

	/* done */
	security.signInUser(user, (err, token) => {
		if (err) {
			console.log("<users> Sign error, err=%o", err);
			next(NPError.create(err));
			return;
		}
		res.json({ success: true, result: { token } });
	});

    } catch(excp) {
	console.log("<users> doAuthenticate: Exception caught, excp=%o", excp);
	next(NPError.create(excp));
    }
});

module.exports = router;
