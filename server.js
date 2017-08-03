//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//and create our instances
var app = express();
var router = express.Router();

//models
const List = require('./src/app/model/List.model');

//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;
const db = 'mongodb://localhost/mongoosetest';
mongoose.Promise = global.Promise;


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

	router.get('/', function(req, res){
		res.send('API initialized')
	});

	//get all lists
	router.get('/lists', function(req, res){
		List.find().lean()
		.exec()
		.then((lists) => {
			res.send(JSON.stringify(lists));
		})
		.catch((err) => {
			console.log('an error has occurred')
			res.send('error has occurred')
		})
	});

	//find one list by id
	router.get('/list/:id', function(req, res){
		console.log('===GET ONE LIST===');
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

	//create a new list
	router.post('/list', function(req, res){
		console.log('===Save new list===')
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

	//post an item to the list
	router.post('/list/:id/item', function(req, res){
		console.log('===Post new Item=====')

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
		{new: true})
		.exec()
		.then((list) => {
			res.send(list);
		})
		.catch((err) => {
			res.send('error saving list');
		});
	})

	//delete an entire list
	router.delete('/list/:id', function(req, res){
		List.findOneAndRemove({
			_id: req.params.id
		})
		.exec()
		.then((list) => {
			res.status(204);
		})
		.catch((err) => {
			res.send('error deleting list');
		});
	})

	//delete an item from the list
	router.delete('/list/:id/item/:itemid', function(req, res){
		//find the list
		List.findOne({
			_id: req.params.id
		})
		.exec()
		.then((list) => {
			//using the returned list, filter out the item
			let items = list.items.filter(function(item){
				//if the entered id is the same as this id, don't return it
				return(item._id != req.params.itemid);
			});

			//update returned list with filtered items
			List.findOneAndUpdate({
				_id: req.params.id
			},
			{
				$set: {items: items} //name: req.body.name
			},
			{new: true}
			)
			.exec()
			.then((updatedList) => {
				res.send(updatedList);
			})
			.catch((err) => {
				res.send('error deleting item 1');
			});
		})
		.catch((err) => {
			res.send('error deleting item 2');
		});
	})

	//edit the item
	router.put('/list/:id/item/:itemid', function(req, res){
		console.log('====Server side edit item====')
		//find the list
		List.findOne({
			_id: req.params.id
		})
		.exec()
		.then((list) => {

			//map items from returned list and update the edited item
			let items = list.items.map(function(item, index){
				//if this is the item in the db
				if(item._id == req.body.item._id){
					item = req.body.item;
				}

				return item;
			});

			//update list in db with new items
			List.findOneAndUpdate({
				_id: req.params.id
			},
			{
				$set: {items: items} //name: req.body.name
			},
			{new: true}
			)
			.exec()
			.then((updatedList) => {
				res.send(updatedList);
			})
			.catch((err) => {
				res.send('error updating item 1');
			});
		})
		.catch((err) => {
			res.send('error updating item 2');
		});
	})




	//Use our router configuration when we call /api
	app.use('/api', router);
	//starts the server and listens for requests
	app.listen(port, function() {
	 console.log(`API running on port ${port}`);
	});
});

