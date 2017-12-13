"use strict";

const TXW = require('lib/txw');

/**
 * Creates a new NPError
 * @class
 * @augments Error
 * @param {string} message The error message
 * @return {NPError} A NPError instance
 */
function NPError(message) { const me = this;

	/* set */
	me.code		= 0;
	me.name		= 'NPError';
	me.message	= message;

	/* set */
	me.status = 500; // HTTP Status-Code (should be in an upper error layer)

	/* set */
	me.errcode = -1;
	me.errmsg = -1;
	me.error = null;
	Error.captureStackTrace(me, NPError);

	/* set */
	this.getI18NMessage = function(lang) {

		/* check */
		if (!TXW.isDefined(lang))
			lang = 'en'; // Fallback! => If no 'lang' set it to default language ('en')

		/* check */
		if (!TXW.isDefined(me.messages))
			me.messages = { en: require('res/strings').errors }; // Init & Load 'fallback' strings ('en')

		/* check */
		if (!TXW.isDefined(me.messages[lang])) {
			try {
				me.messages[lang] = require('res/strings_' + lang).errors; // Load strings for 'lang'
			} catch(e) {
				me.messages[lang] = me.messages['en'];	// Fallback! => Assign 'lang' strings to 'en' ones
			}
		}

		/* check */
		if (!TXW.isDefined(me.messages[lang][me.message]) && (lang != 'en'))
			lang = 'en';		// Fallback! => if no localized message for given 'lang'... try with 'en'
		if (!TXW.isDefined(me.messages[lang][me.message]))
			return(me.message);	// Nothing else to try out!! (returns message as-is)

		/* done */
		return(me.messages[lang][me.message]);
	}
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
			let message = (options.code == 11000) ? "mongoDuplicateKeyErrorMsg" : "mongoErrorMsg";
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

NPError.InvalidParametersError = function(message) { let err = NPError.create({ code: 1, message: "invalidParametersErrorMsg" });
	err.message = message ? message : err.message;
	err.status = 400;
	return(err);
};
NPError.InvalidCredentialsError = function(message) { let err = NPError.create({ code: 2, message: "invalidCredentialsErrorMsg" });
	err.message = message ? message : err.message;
	err.status = 401;
	return(err);
};
NPError.AuthorizationError = function(error) { let err = NPError.create({ code: 3, message: "authorizationErrorMsg" });
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
NPError.MongoError = function(message) { let err = NPError.create({ code: 4, message: "mongoErrorMsg" });
	err.message = message ? message : err.message;
	return(err);
};
NPError.UnknownError = function(message) { let err = NPError.create({ code: 5, message: "unknownErrorMsg" });
	err.message = message ? message : err.message;
	return(err);
};

module.exports = NPError;
