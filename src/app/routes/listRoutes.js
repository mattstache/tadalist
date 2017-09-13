'use strict';

var mongoose = require('mongoose');
var todoList = require('../controllers/list.controller.js'),
userHandlers = require('../controllers/user.controller.js');
var express = require('express');

var router = express.Router();
const List = require('../model/List.model')

router.get('/', function(req, res){
	res.send('API initialized')
});

//get all lists
router.get('/listall', userHandlers.loginRequired, todoList.show_all_lists);

//find one list by id
router.get('/:id', todoList.get_list_by_id);

//create a new list
router.post('/list', todoList.save_new_list)

//post an item to the list
router.post('/:id/item', todoList.save_new_item)

//delete an entire list
router.delete('/:id', todoList.delete_list_by_id)

//delete an item from the list
router.delete('/:id/item/:itemid', todoList.delete_item_by_id)

//edit the item
router.put('/:id/item/:itemid', todoList.edit_item_by_id)

module.exports = router;