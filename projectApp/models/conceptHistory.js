var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var ConceptHistorySchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	mark0: {
	    type: Number
	},
	mark1: {
	    type: Number
	},
	mark2: {
    	type: Number
    },
});

var ConceptHistory = module.exports = mongoose.model('ConceptHistory', ConceptHistorySchema);


module.exports.createConceptHistory = function(newConceptHistory, callback){
	        newConceptHistory.save(callback);


}


