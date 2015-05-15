'use strict';

var express = require('express');
var controller = require('./traveler.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', controller.create);
router.get('/', controller.index);
router.delete('/', controller.destroy);

module.exports = router;
