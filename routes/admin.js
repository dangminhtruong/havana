var express = require('express');
var router = express.Router();
const async = require('async');
const Category = require('../model/category');
const Bill = require('../model/bill');
const User = require('../model/user');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var moment = require('moment');
var weekly = require('../helpers/line_chart_data');


/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

router.get('/', function(req, res, next) {
	res.render('./admin/index');
});
/*--------------------------------------------------------*/
router.get('/category/add', (req, res, next) => {
	res.render('./admin/pages/add_category');
});
/*--------------------------------------------------------*/
router.post('/category/add', urlencodedParser , (req, res, next) => {
	let cate = new Category({
		name : req.body.name,
		type : req.body.type,
		descript : req.body.desc
	});
	cate.save(function (err, results) {
		res.send({
			status : 'inserted'
		});
	});
    
});
/*--------------------------------------------------------*/
router.get('/line-chart', (req, res, next) => {
	weekly(req, res);
});
/*--------------------------------------------------------*/
router.get('/product/add', (req, res, next) => {
	res.render('./admin/pages/add_product');
});
/*--------------------------------------------------------*/
router.get('/bills/index', (req, res, next) => {
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
    ;
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
    ;
});
module.exports = router;
