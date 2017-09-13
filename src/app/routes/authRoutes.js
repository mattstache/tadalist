var express = require('express');
var authRouter = express.Router(); /* Creating the Authentication Router */
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () {
    authRouter.route('/auth/signup') /* Creating the SingUp route */
        .post(function (req, res) {
            console.log(req.body); /* We log the req.body Object created by bodyParser from the signUp post to /auth/signup */
                });

            };

    return authRouter; /* return authRouter to be available for app.js */
};

module.exports = router;

//test  