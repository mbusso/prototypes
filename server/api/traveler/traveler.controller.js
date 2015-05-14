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
  var order = req.query.reverse == "true"? -1: 1; 
  var predicateJson = {};
  predicateJson[req.query.orderBy] = order;
  var filterPredicate = {};

  var filters = [];
  var columns = req.query.columns;

  if(req.query.filter) {
    for(var i=0; i<columns.length; i++) {
      var predicate = {};
      predicate[columns[i]] = req.query.filter;
      filters.push(predicate);
    }    
    filterPredicate["$or"] = filters;
  }
 
    Traveler.count({}, function(err, count) {
      if(err) return res.send(500, err);
      if(count > 0) {
        Traveler.find(filterPredicate).sort(predicateJson).skip(req.query.offset).limit(req.query.pageSize).exec(function (err, users) {
          if(err) return res.send(500, err);
          if(users)
          res.json(200, [{collection: users, length: count}]);
        else {
          res.json(200, [{collection: [], length: 0}]);
        }
        });      
      }     
    })

};

