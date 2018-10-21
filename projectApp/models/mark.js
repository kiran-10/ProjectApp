var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var MarkSchema = mongoose.Schema({
    mark: {
        type: Number,
    },
	username: {
		type: String,
	},
	topic: {
		type: String
	},

});

var Mark = module.exports = mongoose.model('Mark', MarkSchema);

module.exports.createMark = function(newMark, callback){
	        newMark.save(callback);

module.exports.getMarkByUsername = function(username, callback){
	var query = {username: username};
	Mark.findOne(query, callback);
}
}