'use strict';

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

MongoClient.connect('mongodb://' + process.env.MONGODB_URI, (err, db) => {
	db.on('close', () => {
		console.info("Disconnected from mongodb");
	});

	// Drop Collections
	var bulk = db.collection('users').initializeUnorderedBulkOp();
	bulk.find({}).remove();
	bulk.execute();
	var bulk = db.collection('tags').initializeUnorderedBulkOp();
	bulk.find({}).remove();
	bulk.execute();
	var bulk = db.collection('ads').initializeUnorderedBulkOp();
	bulk.find({}).remove();
	bulk.execute();

	// Insert Users
	const users = require('./users-dataset.json');
	bulk = db.collection('users').initializeUnorderedBulkOp();
	for (let i = 0; i < users.length; i++) {
		users[i].password = bcrypt.hashSync(users[i].password, 10);
		bulk.insert(users[i]);
	}
	bulk.execute();
	console.log("Insertado" + ((users.length <= 0) ? "" : "s") + " en Base de Datos " + users.length + " Usuario" + ((users.length <= 0) ? "" : "s"));

	// Insert Tags
	const tags = require('./tags-dataset.json');
	bulk = db.collection('tags').initializeUnorderedBulkOp();
	for (let i = 0; i < tags.length; i++) {
		bulk.insert(tags[i]);
	}
	bulk.execute();
	console.log("Insertada" + ((tags.length <= 0) ? "" : "s") + " en Base de Datos " + tags.length + " Etiqueta" + ((tags.length <= 0) ? "" : "s"));

	// Insert Ads
	const ads = require('./ads-dataset.json');
	bulk = db.collection('ads').initializeUnorderedBulkOp();
	for (let i = 0; i < ads.length; i++) {
		bulk.insert(ads[i]);
	}
	bulk.execute();
	console.log("Insertado" + ((ads.length <= 0) ? "" : "s") + " en Base de Datos " + ads.length + " Anuncio" + ((ads.length <= 0) ? "" : "s"));

	/* */
	db.close();
});
