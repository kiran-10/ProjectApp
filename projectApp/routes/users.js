var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/projectapp');
var db = mongoose.connection;

var url = 'mongodb://localhost:27017/projectapp';
var User = require('../models/user');
var Card = require('../models/card');
var Quiz = require('../models/quiz');
var Mark = require('../models/mark');

// Register
router.get('/register', function (req, res) {
	res.render('register');
});

// Login
router.get('/login', function (req, res) {
	res.render('login');
});

router.get('/slides', function (req, res) {
	res.render('slides');
});


router.get('/addFlashcards', function (req, res) {
	res.render('addFlashcards');
});

router.get('/createQuiz', function (req, res) {
	res.render('createQuiz');
});

router.get('/cardsMenu', function (req, res) {
	res.render('cardsMenu');
});


router.get('/profile', function(req, res){
  res.render('profile', { username: req.user.username });
});

//insert flashcard
router.post('/create-flashcard', function (req, res) {
var set = req.body.set;
var question1 = req.body.question1;
var answer1 = req.body.answer1;
var question2 = req.body.question2;
var answer2 = req.body.answer2;
var question3 = req.body.question3;
var answer3 = req.body.answer3;
var question4 = req.body.question4;
var answer4 = req.body.answer4;
var question5 = req.body.question5;
var answer5 = req.body.answer5;

var newCard = new Card({
                        set: set,
						question1: question1,
						answer1: answer1,
						question2: question2,
                        answer2: answer2,
                        question3: question3,
                        answer3: answer3,
                        question4: question4,
                        answer4: answer4,
                        question5: question5,
                        answer5: answer5,
					});

					Card.createCard(newCard, function (err, card) {
						if (err) throw err;
						console.log(card);
					});
					req.flash('success_msg', 'Flashcard added');
                    					res.redirect('addFlashcards');




});

router.post('/submit-mark', function (req, res, next) {
  var id = req.user.id;
  var mark = req.body.mark;
  console.log('HERE' + id);

  User.findById(id, mark, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    console.log(mark);
    doc.conceptMark = mark;
    doc.save();
  })
  res.redirect('/');
});



//insert quiz question
router.post('/create-quiz', function (req, res) {
var topic = req.body.topic;
var questiona = req.body.questiona;
var answera = req.body.answera;
var incorrectAnswer1a = req.body.incorrectAnswer1a;
var incorrectAnswer2a = req.body.incorrectAnswer2a;
var questionb = req.body.questionb;
var answerb = req.body.answerb;
var incorrectAnswer1b = req.body.incorrectAnswer1b;
var incorrectAnswer2b = req.body.incorrectAnswer2b;
var questionc = req.body.questionc;
var answerc = req.body.answerc;
var incorrectAnswer1c = req.body.incorrectAnswer1c;
var incorrectAnswer2c = req.body.incorrectAnswer2c;
var questiond = req.body.questiond;
var answerd = req.body.answerd;
var incorrectAnswer1d = req.body.incorrectAnswer1d;
var incorrectAnswer2d = req.body.incorrectAnswer2d;
var questione = req.body.questione;
var answere = req.body.answere;
var incorrectAnswer1e = req.body.incorrectAnswer1e;
var incorrectAnswer2e = req.body.incorrectAnswer2e;


var newQuiz = new Quiz({
                        topic: topic,
						questiona: questiona,
						answera: answera,
						incorrectAnswer1a: incorrectAnswer1a,
						incorrectAnswer2a: incorrectAnswer2a,
						questionb: questionb,
                        answerb: answerb,
                        incorrectAnswer1b: incorrectAnswer1b,
                        incorrectAnswer2b: incorrectAnswer2b,
                        questionc: questionc,
                        answerc: answerc,
                        incorrectAnswer1c: incorrectAnswer1c,
                        incorrectAnswer2c: incorrectAnswer2c,
                        questiond: questiond,
                        answerd: answerd,
                        incorrectAnswer1d: incorrectAnswer1d,
                       	incorrectAnswer2d: incorrectAnswer2d,
                        questione: questione,
                        answere: answere,
                        incorrectAnswer1e: incorrectAnswer1e,
                        incorrectAnswer2e: incorrectAnswer2e,

					});

					Quiz.createQuiz(newQuiz, function (err, quiz) {
						if (err) throw err;
						console.log(quiz);
					});
					req.flash('success_msg', 'Quiz added');
                    					res.redirect('createQuiz');




});



router.get('/cardsConcepts', function(req, res, next) {

db.collection('cards').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('cardsConcepts', {cards: result})
  });
});

router.get('/cardsLogic', function(req, res, next) {

db.collection('cards').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('cardsLogic', {cards: result})
  });
});


router.get('/quizConcepts', function (req, res, next) {
db.collection('quizzes').find().toArray((err, result) => {
	res.render('quizConcepts', {quizzes: result});
	});
});

router.get('/quizMenu', function (req, res, next) {
db.collection('marks').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('quizMenu', {marks: result})
  });
});

//register user
router.post('/register', function (req, res) {

	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var role = "user";
	var conceptMark = 0;
	var logicMark = 0;
	var probabilityMark = 0;
	var recursionMark = 0;
	var relationsMark = 0;
	var algebraMark = 0;


	// Validation


	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: {
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: {
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('register', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						email: email,
						username: username,
						password: password,
						role: role,
						conceptMark: conceptMark,
						logicMark: logicMark,
						probabilityMark: probabilityMark,
						recursionMark: recursionMark,
						relationsMark: relationsMark,
						algebraMark: algebraMark
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});

         	req.flash('success_msg', 'flashcard saved');
					res.redirect('/users/login');
				}
			});
		});
	}
});





passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

router.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});


module.exports = router;