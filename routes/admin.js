var express = require('express');
var router = express.Router();
const async = require('async');
const Category = require('../model/category');
const Bill = require('../model/bill');
const Product = require('../model/product');
const _ = require('lodash');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const slug = require('slug');
var moment = require('moment');
var weekly = require('../helpers/line_chart_data');
var multer  = require('multer');
var upload = multer({ dest: 'public/img' });
var config = require('../config/config');

/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

router.get('/', function(req, res) {
	res.render('./admin/index');
});
/*--------------------------------------------------------*/
router.get('/category/add', (req, res) => {
	res.render('./admin/pages/add_category');
});
/*--------------------------------------------------------*/
router.post('/category/add', urlencodedParser , (req, res) => {
	let cate = new Category({
		name : req.body.name,
		type : req.body.type,
		descript : req.body.desc
	});
	cate.save(function () {
		res.send({
			status : 'inserted'
		});
	});
    
});
/*--------------------------------------------------------*/
router.get('/line-chart', (req, res) => {
	weekly(req, res);
});
/*--------------------------------------------------------*/
router.get('/bills/index', (req, res) => {
	res.render('./admin/pages/bills_main'); 
});
/*--------------------------------------------------------*/
router.get('/bills/today-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('day'),
			$lt : moment().endOf('day')
		}
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			res.send(bills); 
		});
    
});
/*--------------------------------------------------------*/
router.get('/bills/week-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('week'),
			$lt : moment().endOf('week')
		}
	})
		.sort({createdOn : -1 })
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			res.send(bills); 
		});
});
/*--------------------------------------------------------*/
router.get('/bills/month-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('month'),
			$lt : moment().endOf('month')
		}
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});
/*--------------------------------------------------------*/
router.get('/bills/week-done-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('week'),
			$lt : moment().endOf('week')
		},
		status : config.status.done
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});
/*--------------------------------------------------------*/
router.get('/bills/week-pendding-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('week'),
			$lt : moment().endOf('week')
		},
		status : config.status.new
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});
/*--------------------------------------------------------*/
router.get('/bills/week-shipping-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('week'),
			$lt : moment().endOf('week')
		},
		status : config.status.shipping
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});
/*--------------------------------------------------------*/
router.get('/bills/week-confirm-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('week'),
			$lt : moment().endOf('week')
		},
		status : config.status.confirm
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});

/*--------------------------------------------------------*/
router.get('/bills/month-done-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('month'),
			$lt : moment().endOf('month')
		},
		status : config.status.done
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});
/*--------------------------------------------------------*/
router.get('/bills/month-pendding-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('month'),
			$lt : moment().endOf('month')
		},
		status : config.status.new
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});
/*--------------------------------------------------------*/
router.get('/bills/month-shipping-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('month'),
			$lt : moment().endOf('month')
		},
		status : config.status.shipping
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});
/*--------------------------------------------------------*/
router.get('/bills/month-confirm-data', (req, res) => {
	Bill.find({
		createdOn : {
			$gt : moment().startOf('month'),
			$lt : moment().endOf('month')
		},
		status : config.status.confirm
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});


/*--------------------------------------------------------*/
router.post('/bills/start-end-data',urlencodedParser, (req, res) => {
	Bill.find({
		createdOn : {
			$gt : req.body.startDay,
			$lt : req.body.endDay
		}
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
    
});
/*--------------------------------------------------------*/
router.get('/bills/status-data', (req, res) => {
	Bill.find({
		status : req.query.status
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
    
});
/*--------------------------------------------------------*/
router.post('/bills/start-end-pedding', urlencodedParser,(req, res) => {
	Bill.find({
		createdOn : {
			$gt : req.body.startDay,
			$lt : req.body.endDay
		},
		status : config.status.new
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});
/*------------------------------------------------------*/

router.post('/bills/start-end-confirmed', urlencodedParser, (req, res) => {
	Bill.find({
		createdOn : {
			$gt : req.body.startDay,
			$lt : req.body.endDay
		},
		status : config.status.confirm
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});

/*-------------------------------------------------------*/

router.post('/bills/start-end-shipping', urlencodedParser, (req, res) => {
	Bill.find({
		createdOn : {
			$gt : req.body.startDay,
			$lt : req.body.endDay
		},
		status : config.status.shipping
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});
/*-------------------------------------------------------*/
router.post('/bills/start-end-done', urlencodedParser, (req, res) => {
	Bill.find({
		createdOn : {
			$gt : req.body.startDay,
			$lt : req.body.endDay
		},
		status : config.status.done
	})
		.populate('user')
		.populate({
			path : 'detais.product_id',
			select : 'name'
		})
		.exec((err, bills) => {
			return res.send(bills); 
		});
});

/*--------------------------------------------------------*/
router.get('/product/add', (req, res) => {
	res.render('./admin/pages/add_product');
});
/*--------------------------------------------------------*/
router.post('/product/add',upload.any(),urlencodedParser, (req, res) => {
	let cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, 
		{ name: 'details', maxCount: 8 }]);
	let product = new Product({
		name : req.body.product_name,
		unit_price : req.body.unit_price,
		promo_price : req.body.promo_price,
		slug_name : slug(req.body.product_name),
		descript: req.body.description,
		image : req.files[0].filename,
		status : req.body.status,
		quantity : req.body.quantity,
		saled : 0,
		category_id : req.body.product_type,
		size : _.split(req.body.size[0], ','),
		color : req.body.color,
		image_detais : _.map(_.filter(req.files, { 'fieldname': 'details[]' }), 'originalname'),
		rate : [],
		comment : []
	});
 
	product.save(function (err) {
		if(err){
			return res.render('./admin/pages/add_product', {
				messages : 'Opps! somethings went wrong'
			});
		} 
		return res.render('./admin/pages/add_product', {
			messages : 'Add product sucessfull!'
		});
	}); 
	
});

/*-------------------------------------------------*/

router.get('/analytic-data', (req, res) => {
	

	let startDay = new Date(moment().startOf('day'));
	let endDay = new Date(moment().endOf('day'));
	let startWeek = new Date(moment().startOf('week'));
	let endWeek = new Date(moment().endOf('week'));
	let startMonth = new Date(moment().startOf('month'));
	let endMonth = new Date(moment().endOf('month'));

	async.parallel([
		function(callback){
			Bill.aggregate(
				{$unwind:'$detais'},
				{ $match : {
					createdOn : {
						$gt : startDay,
						$lt : endDay
					}
				} 
				},
				{
					$group : {
						_id : '$detais.product_name',
						total : { $sum : '$detais.quantity' },
						earned : { $sum : '$detais.price' }
					}
				},
				{ $sort :{ total: -1 } }
			)
				.limit(10)
				.exec((err, records) => {
					Product.find( { _id: { $in: records } }, { name : 1 } )
						.exec(() => {
							callback(null, records);
						}); 
				});  
		},
		function(callback){
			Bill.aggregate(
				{$unwind:'$detais'},
				{ $match : {
					createdOn : {
						$gt : startWeek,
						$lt : endWeek
					}
				} 
				},
				{
					$group : {
						_id : '$detais.product_name',
						total : { $sum : '$detais.quantity' },
						earned : { $sum : '$detais.price' },
					}
				},
				{ $sort :{ total: -1 } }
			)
				.limit(10)
				.exec((err, records) => {
					callback(null, records);
				});  
		},
		function(callback){
			Bill.aggregate(
				{$unwind:'$detais'},
				{ $match : {
					createdOn : {
						$gt : startMonth,
						$lt : endMonth
					}
				} 
				},
				{
					$group : {
						_id : '$detais.product_name',
						total : { $sum : '$detais.quantity' },
						earned : { $sum : '$detais.price' },
					}
				},
				{ $sort :{ total: -1 } }
			)
				.limit(10)
				.exec((err, records) => {
					callback(null, records);
				});  
		},
		function(callback){
			Bill.aggregate(
				{$unwind:'$detais'},
				{ $match : {
					createdOn : {
						$gt : startMonth,
						$lt : endMonth
					}
				} 
				},
				{
					$group : {
						_id : '$detais.category_name',
						total : { $sum : '$detais.quantity' },
					}
				},
				{ $sort :{ total: -1 } }
			)
				.limit(10)
				.exec((err, records) => {
					callback(null, records);
				});  
		}
	],
	function(err, results) {
		if(err){
			throw new err;
		}
		

		return res.send({
			days : results[0],
			week : results[1],
			month : results[2],
			chart : results[3],
			daySum :  _.sumBy(results[0], function(o) { return o.total; }),
			weekSum : _.sumBy(results[1], function(o) { return o.total; }),
			monthSum : _.sumBy(results[2], function(o) { return o.total; }),
			dayEarn :  _.sumBy(results[0], function(o) { return o.earned; }),
			weekEarn :  _.sumBy(results[1], function(o) { return o.earned; }),
			monthEarn :  _.sumBy(results[2], function(o) { return o.earned; }),
		});
	}
	);
});
/*-------------------------------------------------*/
router.get('/analytic', (req, res) => {
	res.render('./admin/pages/analytic');
});
module.exports = router;
