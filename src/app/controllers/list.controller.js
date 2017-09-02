'use strict';

var mongoose = require('mongoose')
  //models
const List = require('../model/List.model'), 
User = require('../model/User.model');

console.log('listController')
exports.show_all_lists = function(req, res) {
	console.log('show_all_lists');
	List.find().lean()
	.exec()
	.then((lists) => {
		res.send(JSON.stringify(lists));
	})
	.catch((err) => {
		console.log('an error has occurred')
		res.send('error has occurred')
	})
};

exports.get_list_by_id = function(req, res) {
	console.log('get_list_by_id');
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

};

exports.delete_list_by_id = function(req, res) {
	console.log('delete_list_by_id');
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

};

exports.save_new_list = function(req, res) {
	console.log('save_new_list');
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

};

exports.save_new_item = function(req, res) {
	console.log('save_new_item');
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
};

exports.edit_item_by_id = function(req, res) {
	console.log('edit_item_by_id');
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
};

exports.delete_item_by_id = function(req, res) {
	console.log('delete_item_by_id');
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

		console.log('items to be posted')
		console.log(items)

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
			console.log('UpdateList===')
			console.log(updatedList)
			res.send(updatedList);
		})
		.catch((err) => {
			res.send('error deleting item 1');
		});
	})
	.catch((err) => {
		res.send('error deleting item 2');
	});

};