'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
// require('../mongoose-paginate.js');
var util = require('util');

function ContentBuilderSchema() {
    Schema.apply(this, arguments);

this.statics.findWithPagination = function(criteria, callback) {
  var model = this;
  var sortPredicate = createSortPredicate(criteria);
  var filterPredicate = createFilterPredicate(criteria);
  model.count({}, function(err, count) {
    if(err) callback(err, null, count);
    if(count > 0) {
      model.find(filterPredicate).sort(sortPredicate).skip(criteria.offset).limit(criteria.pageSize).exec(function (err, users) {
        if(err) callback(err, users, 0);
        if(users)
          callback(err, users, count);
        else {
          callback(err, [], 0);
        }
      });      
    }     
  });
};

function createSortPredicate(criteria) {
  var sortPredicate = {};
  sortPredicate[criteria.orderBy] = criteria.reverse == "true"? -1: 1;
  return sortPredicate;
};

function createFilterPredicate(criteria) {
  var columns = criteria.columns;
  var filterPredicate = {};
  var filters = [];  

  if(criteria.filter) {
    for(var i=0; i<columns.length; i++) {
      var predicate = {};
      predicate[columns[i]] = new RegExp(criteria.filter, "i");
      filters.push(predicate);
    }    
    filterPredicate["$or"] = filters;
  }
  return filterPredicate;
};
}

util.inherits(ContentBuilderSchema, Schema);

var TravelerSchema = new ContentBuilderSchema({
  firstName: String,
  middleName: String,
  lastName: String,
  title: String,
  employeeId: String
});

module.exports = mongoose.model('Traveler', TravelerSchema);
