'use strict';

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
		security.verifyToken(token, (err, decoded) => {
			if (err) {
				next(new NPError.AuthorizationError(err));
				return;
			}
			req.userId = decoded._id;
			next();
		});
	});
    }
}
