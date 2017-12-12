'use strict';

const manager = require('services/nodepop/model');
const NPError = require('services/nodepop/model/error');

const security = require('./index');

module.exports = {

    // Handler
    handler: () => {

	/* done */
	return(function(req, res, next) {
		const token = req.body.token || req.query.token || req.get('x-access-token');

		/* check */
		if (!token) {
			next(new NPError.AuthorizationError("No Token Provided"));
			return;
		}

		/* check */
		security.verifyToken(token, async (err, decoded) => {

			/* check */
			if (err) {
				next(new NPError.AuthorizationError(err));
				return;
			}

			/* check */
			let user = null;
			if ((user = await manager.getUser(decoded._id)) == null) {
				next(new NPError.AuthorizationError());
				return;
			}

			/* set */
			req.userId	= decoded._id;
			req.user	= user;

			/* */
			next();
		});
	});
    }
}
