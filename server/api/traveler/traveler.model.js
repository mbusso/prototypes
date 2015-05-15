'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var PrescientTravelerSchema = require('../prescient-mongo-schema.js');

var TravelerSchema = new PrescientTravelerSchema({
	firstName: String,
	middleName: String,
	lastName: String,
	title: String,
	employeeId: String
});

module.exports = mongoose.model('Traveler', TravelerSchema);
