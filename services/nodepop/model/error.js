"use strict";

/**
 * Creates a new NPError
 * @class
 * @augments Error
 * @param {string} message The error message
 * @return {NPError} A NPError instance
 */
function NPError(message) {
  this.code = 0;
  this.name = 'NPError';
  this.message = message;
  this.status = 500;
  this.errcode = -1;
  this.errmsg = -1;
  this.error = null;
  Error.captureStackTrace(this, NPError);
}

/**
 * Creates a new NPError object
 * @method
 * @param {object} options The error options
 * @return {NPError} A NPError instance
 */
NPError.create = function(options) { let err = null;

	/* check */
	if (options instanceof NPError)
		return(options);

	/* check */
	if (options instanceof Error) {

		/* check */
		if (options.name === 'MongoError') {
			let message = (options.code == 11000) ? "Duplicate Key Error" : "Mongo Error";
			err = new NPError.MongoError(message);
		}
		else
			err = new NPError.UnknownError();

		/* set */
		err.errcode	= options.code;
		err.errmsg	= options.message;
		err.stack	= options.stack;
		err.error	= options;

	} else if (typeof options == 'string') {
		err = new NPError(options);
	} else {
		err = new NPError(options.message || options.errmsg || options.$err || "n/a");

		// Other options
		for (var name in options)
			err[name] = options[name];
	}

	/* done */
	return(err);
}

// Extend JavaScript error
NPError.prototype = new Error;

NPError.InvalidParametersError = function(message) { let err = NPError.create({ code: 1, message: "Invalid Parameters" });
	err.message = message ? message : err.message;
	err.status = 400;
	return(err);
};
NPError.InvalidCredentialsError = function(message) { let err = NPError.create({ code: 2, message: "Invalid Credentials" });
	err.message = message ? message : err.message;
	err.status = 401;
	return(err);
};
NPError.AuthorizationError = function(error) { let err = NPError.create({ code: 3, message: "Authorization Failed" });
	if (typeof error == 'string')
		error = { message: error };
	if (error) {
		err.errcode	= error.code;
		err.errmsg	= error.message;
		err.stack	= error.stack;
		err.error	= error;
	}
	err.status = 401;
	return(err);
};
NPError.MongoError = function(message) { let err = NPError.create({ code: 4, message: "Mongo Error" });
	err.message = message ? message : err.message;
	return(err);
};
NPError.UnknownError = function(message) { let err = NPError.create({ code: 5, message: "Unknown Error" });
	err.message = message ? message : err.message;
	return(err);
};

module.exports = NPError;
