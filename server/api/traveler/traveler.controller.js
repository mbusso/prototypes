'use strict';

var Traveler = require('./traveler.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');


var validationError = function(res, err) {
  return res.json(422, err);
};


exports.create = function (req, res, next) {
  var newTraveler = new Traveler(req.body);
  newTraveler.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

exports.index = function(req, res) {
  Traveler.findWithPagination(req.query, function(err, users, length){
    if(err) return res.send(500, err);
    res.json(200, [{collection: users, length: length}]);
  });
};

exports.destroy = function(req, res) {
  Traveler.findByIdAndRemove(req.query.id, function(err, traveler) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

