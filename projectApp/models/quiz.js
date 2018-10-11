var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var QuizSchema = mongoose.Schema({
topic: {
		type: String,
	},
	questiona: {
		type: String,
	},
	answera: {
		type: String
	},
	incorrectAnswer1a: {
    	type: String,
    },

    incorrectAnswer2a: {
    	type: String
    },
    	questionb: {
    		type: String,
    	},
    	answerb: {
    		type: String
    	},
    	incorrectAnswer1b: {
        	type: String,
        },

        incorrectAnswer2b: {
        	type: String
        },
        	questionc: {
        		type: String,
        	},
        	answerc: {
        		type: String
        	},
        	incorrectAnswer1c: {
            	type: String,
            },

            incorrectAnswer2c: {
            	type: String
            },
            	questiond: {
            		type: String,
            	},
            	answerd: {
            		type: String
            	},
            	incorrectAnswer1d: {
                	type: String,
                },

                incorrectAnswer2d: {
                	type: String
                },
                	questione: {
                		type: String,
                	},
                	answere: {
                		type: String
                	},
                	incorrectAnswer1e: {
                    	type: String,
                    },

                    incorrectAnswer2e: {
                    	type: String
                    },

});

var Quiz = module.exports = mongoose.model('Quiz', QuizSchema);

module.exports.createQuiz = function(newQuiz, callback){
	        newQuiz.save(callback);


}