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
  Traveler.findByIdAndRemove(req.params.id, function(err, traveler) {
    if(err) return res.send(500, err);
    if(!traveler) return res.send(500, "traveler doesnt exist");
    return res.send(204);
  });
};

exports.show = function (req, res, next) {
  var travelerId = req.params.id;
  Traveler.findById(travelerId, function (err, traveler) {
    if (err) return next(err);
    if (!traveler) return res.send(401);
    res.json(traveler);
  });
};

exports.update = function(req, res, next) {
  var traveler = req.body;
  Traveler.findByIdAndUpdate(traveler._id, traveler , function(err, traveler) {
    if (err) return validationError(res, err);
    if(!traveler) return res.send(500, "traveler doesnt exist");
    return res.send(200);
  });
 
};

