
var express = require('express');
var router = express.Router();
const async = require('async');
const Product = require('../model/product');
const User = require('../model/user');
const Category = require('../model/category');
const Bill = require('../model/bill');
const Message = require('../model/messages');
var config = require('../config/config');

var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
	function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}
));
/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

router.get('/change-languages/:lang', function(req, res) {
	res.cookie('lang', req.params.lang, { maxAge: 900000 });
	res.redirect('back');
});

router.get('/', function(req, res) {
	async.parallel([
		function (callback) {
			Product.find().sort({ createdOn: -1 }).limit(4)
				.exec((err, news) => {
					callback(null, news);
				});
		},
		function (callback) {
			Product.find({ status: 2 }).limit(4)
				.exec((err, features) => {
					callback(null, features);
				});
		}
	],
		// Call back
	function (err, results) {
		if (err) {
			throw new err;
		}
		return res.render('index', {
			news: results[0],
			features: results[1],
			cart: req.session.cart,
			user: req.user
		});
	});
});

router.post('/login/client', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {  throw new errr; }

		if (!user) {
			return res.json(
				{
					status : 401
				}
			); 
		}

		req.logIn(user, function (err) {
			if (err) { throw new err; }
			return res.json({
				status : 200
			});
		});

	})(req, res, next);
});


router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});


router.get('/login/admin', (req, res) => {
	return res.render('./pages/login', {
		user: req.session.user
	});
});

router.post('/login/admin', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {  throw new errr; }

		if (!user) {
			return res.render('./pages/login', {
				failureMessage : 'Invalid username or password!'
			}); 
		}

		req.logIn(user, function (err) {
			return res.redirect('/admin');
		});

	})(req, res, next);
});

router.get('/index-data', (req, res) => {
	async.parallel([
		function (callback) {
			Product.find().sort({ createdOn: -1 }).limit(8)
				.exec((err, news) => {
					callback(null, news);
				});
		},
		function (callback) {
			Product.find({ status: 2 }).limit(8)
				.exec((err, features) => {
					callback(null, features);
				});
		},
		function(callback) {
			Category.find({}, {_id : 1, name : 1, type : 1})
				.exec((err, category) => {
					callback(null, category);
				});
		}
	],
		// Call back
	function (err, results) {
		if (err) {
			throw new err;
		}
		return res.json(
			{
				cart_items : (req.session.cart) ? req.session.cart.length : 0,
				newProducts: results[0],
				featuresProduct: results[1],
				category : results[2]
			});
	});
});

router.get('/category-data/:id', (req, res) => {
	async.parallel([
		(callback) => {
			if (req.query.pages != null) {
				Product.find({ category_id: req.params.id })
					.skip((req.query.pages - 1) * 9)
					.limit(9)
					.exec((err, category_products) => {
						callback(null, category_products);
					});
			} else {
				Product.find({ category_id: req.params.id }).limit(9)
					.exec((err, category_products) => {
						callback(null, category_products);
					});
			}

		},
		(callback) => {
			Product.find().sort({ createdOn: -1 }).limit(4)
				.exec((err, latest_products) => {
					callback(null, latest_products);
				});
		},
		(callback) => {
			Product.find().sort({ saled: -1 }).limit(4)
				.exec((err, best_sales) => {
					callback(null, best_sales);
				});
		},
		(callback) => {
			Product.find({ category_id: req.params.id }).count()
				.exec((err, total_records) => {
					callback(null, total_records);
				});
		},
		(callback) => {
			Category.find({}, {_id : 1, name : 1, type : 1})
				.exec((err, category) => {
					callback(null, category);
				});
		}
	],
	(err, results) => {
		res.send({
			products: results[0],
			latest: results[1],
			best: results[2],
			category : results[4],
			pages: Math.ceil(results[3] / 9),
			categoryId: req.params.id,
			cart: (req.session.cart) ? req.session.cart.length : 0,
			currentPage : (req.query.pages) ? req.query.pages : 1
		});
	});

});


router.get('/product-data/:id', function (req, res) {
	async.parallel([
		function (callback) {
			Product.find({ _id: req.params.id })
				.exec((err, product) => {
					callback(null, product);
				});
		},
		function (callback) {
			Product.find().sort({ createdOn: -1 }).limit(3)
				.exec((err, related_product) => {
					callback(null, related_product);
				});
		},
		(callback) => {
			Category.find({}, {_id : 1, name : 1, type : 1})
				.exec((err, category) => {
					callback(null, category);
				});
		},
		(callback) => {
			Product.find().sort({ saled: -1 }).limit(4)
				.exec((err, best_sales) => {
					callback(null, best_sales);
				});
		}
	],
	function (err, results) {
		res.json({
			product: results[0][0],
			related_product: results[1],
			cart: (req.session.cart) ? req.session.cart.length : 0,
			category : results[2],
			best_sales : results[3]
		});
	});

});

router.get('/category', (req, res) => {
	Category.find({}, {_id : 1, name : 1, type : 1})
		.exec((err, categories) => {
			res.json({
				category : categories,
				cart : (req.session.cart) ? req.session.cart.length : 0
			});
		});
});


router.get('/authenticate', (req, res) => {
	return res.json({
		status : 200,
		user : req.user
	});
});

router.get('/bill/verfi/:id', (req, res) => {
	Bill.findByIdAndUpdate(
		req.params.id, 
		{ status : config.status.confirm }, 
		{ new : true },
		(err, bill) => {
			if (err) return res.status(500).send(err); 
			res.render('./pages/verfi_sucess');
		}
	); 
})


router.post('/register', (req, res) => {
	let user = new User({
		username : req.body.username,
		address : req.body.useraddress,
		email : req.body.useremail,
		password : req.body.password,
		phone : req.body.userphone,
		status : config.userStatus.unConfirm,
		role : config.userStatus.isCustomer
	}); 


	user.save(function (err, results) {
		if(err){
			return res.status(500).send({
				code : err.code
			});
		} 
	/* 	eventEmitter.emit('sendConfirmOrderMail', {
			items : data.detailsArr,
			user : req.user,
			total : data.billTotal,
			billId : results._id
		}); 
	*/
		req.app.io.emit('notifiNewUser', {
            content : 'Có người dùng đăng ký mới !',
		});
		return res.status(200).json({
			messages : 'Sucessfull register!',
		});
	}); 


});

router.get('/chatbox', (req, res) => {
	async.parallel([
		(callback) => {
			Category.find({}, {_id : 1, name : 1, type : 1})
			.exec((err, categories) => {
				callback(null, categories);
			});
		},
		(callback) => {
			User.find({ role : config.userStatus.isStaff , status : config.activity.online })
			.exec((err, users)=>{
				callback(null, users);
			});
		}
	],
	(err, results) => {
		return res.json({
			category : results[0],
			cart : (req.session.cart) ? req.session.cart.length : 0,
			user : req.user,
			onlineStaff : results[1]
		});
	});
	
});


router.post('/chatbox/fetch/message', (req, res) => {
	Message.find({ members : { $all: [req.user._id, req.body.userId] } })
	.exec((err, messages) => {
		if(err){
			return res.status(500).json({
				messages : err.code
			});
		}
		return res.status(200).json({
			messages : (messages.length !== 0) ? messages : null
		});
	});
});

router.post('/chatbox/add/message', (req, res) => {

	Message.find({ members : { $all: [req.body.curentId, req.body.targetId] } })
	.exec((err, message) => {
		console.log('mess',message);
		if(message.length !== 0){
			Message.findOneAndUpdate(
				{ members : { $all: [req.body.curentId, req.body.targetId] } },
				{
					$push: 
						{
							messages: 
								{ 
									user_name : req.body.username,
									status : 1,
									message : req.body.message
								}
						}
				},
				{ new : true },
				(err, messages) => {
				/* 	req.app.io.emit('newMessage', {
						messages : messages,
					}); */
		
					return res.status(200).json({
						messages : messages
					});
				}
			);
		}else{
			let message = new Message({
				members : [req.body.curentId, req.body.targetId],
				messages : [
					{ 
						user_name : req.body.username,
						status : 1,
						message : req.body.message
					}
				],
			});
			message.save((err, messages) => {
				if(err){
					console.log(err);
				}
				console.log(messages);
				return res.status(200).json({
					messages : {
						messages : [{
							user_name : req.body.username,
							status : 1,
							message : req.body.message
						}]
					}
				});
			});
		}
	});
});

module.exports = router;
