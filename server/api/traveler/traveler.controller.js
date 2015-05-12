'use strict';

var Traveler = require('./traveler.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newTraveler = new Traveler(req.body);
  newTraveler.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

exports.index = function(req, res) {
  console.log(req.query);
  Traveler.find({}, function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

