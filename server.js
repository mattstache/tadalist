//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//and create our instances
var app = express();
var router = express.Router();

const List = require('./src/app/model/List.model');
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;
const db = 'mongodb://localhost/mongoosetest';
mongoose.Promise = global.Promise;
// mongoose.connect(db);

// Using `mongoose.connect`...
var promise = mongoose.connect(db, {
  useMongoClient: true,
  /* other options */
});

promise.then(function(db) {
  /* Use `db`, for instance `db.model()`*/

  	//now we should configure the API to use bodyParser and look for 
	//JSON data in the request body
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	//To prevent errors from Cross Origin Resource Sharing, we will set 
	//our headers to allow CORS with middleware like so:
	app.use(function(req, res, next) {
	 res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Access-Control-Allow-Credentials', 'true');
	 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	//and remove cacheing so we get the most recent comments
	 res.setHeader('Cache-Control', 'no-cache');
	 next();
	});
	//now we can set the route path & initialize the API
	// router.get('/', function(req, res) {
	//  res.json({ message: 'API Initialized!'});
	// });

	router.get('/', function(req, res){
		res.send('here we are')
	});

	router.get('/lists', function(req, res){
		console.log('===GETTING ALL LISTS===');
		List.find()
		.exec()
		.then((lists) => {
			res.json(lists);
		})
		.catch((err) => {
			console.log('an error has occurred')
			res.send('error has occurred')
		})
	});

	router.get('/list/:id', function(req, res){
		console.log('===GETTING ONE LIST===');
		List.findOne({
			_id: req.params.id
		})
		.exec()
		.then((list) => {
			res.json(list);
		})
		.catch((err) => {
			console.log('an error has occurred')
			res.send('error has occurred')
		});
	});

	router.post('/list', function(req, res){
		console.log('saving new <list></list>')
		var newList = new List();

		newList.name = req.body.name;

		console.log(req.body);

		newList.save()
		.exec()
		.then((list) => {
			res.send(list);
		})
		.catch((err) => {
			res.send('error saving list');
		});

	})

	router.put('/list/:id', function(req, res){
		List.findOneAndUpdate({
			_id: req.params.id
		},
		{
			$set: {name: req.body.name}
		},
		{upset: true})
		.exec()
		.then((list) => {
			console.log(list)
			res.status(204);
		})
		.catch((err) => {
			res.send('error saving list');
		});
	})

	router.delete('/list/:id', function(req, res){
		List.findOneAndRemove({
			_id: req.params.id
		})
		.exec()
		.then((list) => {
			console.log(list)
			res.status(204);
		})
		.catch((err) => {
			res.send('error deleting list');
		});
	})




	//Use our router configuration when we call /api
	app.use('/api', router);
	//starts the server and listens for requests
	app.listen(port, function() {
	 console.log(`api running on port ${port}`);
	});
});

