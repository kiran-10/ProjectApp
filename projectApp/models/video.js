var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var VideoSchema = mongoose.Schema({
    question: {
        type: String,
    },
	answer: {
		type: String,
	},
	file: {
		type: String
	},


});

var Video = module.exports = mongoose.model('Video', VideoSchema);

module.exports.createVideo = function(newVideo, callback){
	        newVideo.save(callback);


}