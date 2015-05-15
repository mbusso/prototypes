'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var TravelerSchema = new Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  title: String,
  employeeId: String
});

module.exports = mongoose.model('Traveler', TravelerSchema);
