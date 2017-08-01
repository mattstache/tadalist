var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var ListItem = require('./ListItem.model');

var ListSchema = new Schema({
	name: String,
	createdDate: {
		type: Date,
		default: Date.now
	},
	items: [{
		_id: Schema.Types.ObjectId,
		name: String,
		status: String
	}]
})

module.exports = mongoose.model('List', ListSchema);