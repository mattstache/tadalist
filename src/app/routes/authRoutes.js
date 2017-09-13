'use strict';

var userHandlers = require('../controllers/user.controller.js');
var express = require('express');
var router = express.Router();

router.post('/register', userHandlers.register);

router.post('/signin', userHandlers.sign_in);

module.exports = router;