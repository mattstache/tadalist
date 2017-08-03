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
		List.find().lean()
		.exec()
		.then((lists) => {
			//res.json(lists);
			console.log(lists)
			res.send(JSON.stringify(lists));
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
		}).lean()
		.exec()
		.then((list) => {
			console.log(list)
			res.send(JSON.stringify(list));
		})
		.catch((err) => {
			console.log('an error has occurred')
			console.log(err);
			res.send('error has occurred')
		});
	});

	router.post('/list', function(req, res){
		console.log('saving new <list></list>')
		var newList = new List();

		newList.name = req.body.name;

		console.log(newList);

		newList.save()
		.then((list) => {
			res.send(list);
		})
		.catch((err) => {
			res.send('error saving list');
		});

	})

	router.post('/list/:id', function(req, res){
		console.log('===Post new Item=====')
		console.log(req.body.items)

		let items = req.body.items.map(function(item, index){
			//if there is no object id, assign one
			if(typeof item._id == 'undefined'){
				item._id = mongoose.Types.ObjectId();
			}

			return item;
		});

		List.findOneAndUpdate({
			_id: req.params.id
		},
		{
			$set: {items: items} //name: req.body.name
		},
		{upsert: true})
		.exec()
		.then((list) => {
			//console.log(list)
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

	router.post('/list/:id/item/:itemid', function(req, res){
		console.log('delete item: ' + req.params.itemid + ' from list: ' + req.params.id)
		List.findOne({
			_id: req.params.itemid
		})
		.exec()
		.then((list) => {
			//console.log(list)
			console.log('in the then')
			let items = list.items.map(function(item, index){
				//if the entered id is the same as this id, don't return it
				if(item._id != req.params.id){
					return item;
				}
			});

			console.log('new list of items')
			console.log(items)

			List.findOneAndUpdate({
				_id: req.params.itemid
			},
			{
				$set: {items: items} //name: req.body.name
			})
			.exec()
			.then((list) => {
				//console.log(list)
				res.status(204);
			})
			.catch((err) => {
				res.send('error deleting item 1');
			});
		})
		.catch((err) => {
			res.send('error deleting item 2');
		});
	})




	//Use our router configuration when we call /api
	app.use('/api', router);
	//starts the server and listens for requests
	app.listen(port, function() {
	 console.log(`api running on port ${port}`);
	});
});

