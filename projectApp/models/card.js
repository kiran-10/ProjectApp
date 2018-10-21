var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var CardSchema = mongoose.Schema({
    set: {
        type: String,
    },
	question1: {
		type: String,
	},
	answer1: {
		type: String
	},
	question2: {
    	type: String,
    },
    answer2: {
    	type: String
    },
    question3: {
    	type: String,
    },
    answer3: {
    	type: String
    },
    question4: {
    	type: String,
    },
    answer4: {
    	type: String
    },
    question5: {
    	type: String,
    },
    answer5: {
    	type: String
    },

});

var Card = module.exports = mongoose.model('Card', CardSchema);

module.exports.createCard = function(newCard, callback){
	        newCard.save(callback);


}