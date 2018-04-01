const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Product = require('../model/product');
const Bill = require('../model/bill');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const config = require('../config/config');
let coutCartTotal = require('../helpers/cart_total');
const Category = require('../model/category');
const connectionHandle = require('../helpers/order_confirm_mail');
var event = require('events');
var eventEmitter = new event.EventEmitter();
eventEmitter.on('sendConfirmOrderMail', connectionHandle);
/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

router.post('/add/:id', function(req, res, next) {
	let sess = req.session;
    
	if(!sess.cart){
		Product.findOne({ _id : req.params.id })
			.populate({
				path : 'category_id',
				select : 'name'
			})
			.exec((err, product) => {
				sess.cart = [
					{
						product_id : req.params.id,
						product_name : product.name,
						unit_price : product.unit_price,
						promo_price : product.promo_price,
						product_quantity : 1,
						product_img : product.image,
						product_category : product.category_id.name,
						color : req.body.color,
						size : req.body.size,
						sizeAvai : product.size,
						colorAvai : product.colors
					}
				];
			}).then(() => {
				res.send({
					cart_items : 1
				});
			});
	}
	//----------------------------
	else{
		let check = _.findIndex(sess.cart, { 'product_id': req.params.id });
		if(check !== -1 ){
			sess.cart[check].product_quantity += 1;
			return res.json({
				cart_items : sess.cart.length
			});
		}
		//------------------------
		else{
			Product.findOne({ _id : req.params.id })
				.populate({
					path : 'category_id',
					select : 'name'
				})
				.exec((err, product) => {
					sess.cart.push(
						{
							product_id : req.params.id,
							product_name : product.name,
							unit_price : product.unit_price,
							promo_price : product.promo_price,
							product_quantity : 1,
							product_img : product.image,
							product_category : product.category_id.name,
							color : req.body.color,
							size : req.body.size,
							sizeAvai : product.size,
							colorAvai : product.colors
						}
					);
				}).then(() => {
					return res.json({
						cart_items : sess.cart.length
					});
				});
		} 
		//------------------------
	}
});

router.get('/remove/:id', (req, res, next) => {
	try {
		_.remove(req.session.cart, function(obj) {
			return obj.product_id === req.params.id;
		});
		res.send({
			products : req.session.cart,
			total : coutCartTotal(req.session.cart)
		});
	} catch (error) {
		res.send('failed');
	}
  
});

router.get('/details', function(req, res, next) {
	return res.render('./pages/view_cart', {
		cart : req.session.cart,
		user : req.user,
		total : coutCartTotal(req.session.cart)
	});
});


router.get('/cart-data', function(req, res, next){
	return res.send({
		items : req.session.cart,
		user : req.user,
		total : coutCartTotal(req.session.cart)
	});
});

router.get('/update-quantity/:id', (req, res) => {
	let index = _.findIndex(req.session.cart, { product_id : req.params.id });
	req.session.cart[index].product_quantity = req.query.newQuantity;
	return res.json({
		products : req.session.cart,
		total : coutCartTotal(req.session.cart)
	});
});

router.post('/update-color', (req, res) => {
	let index = _.findIndex(req.session.cart, { product_id : req.body.currentId});
	req.session.cart[index].color = req.body.colorUpdate;
		return res.json({
			products : req.session.cart
		});
});

router.get('/update-size/:id', (req, res) => {
	let index = _.findIndex(req.session.cart, { product_id : req.params.id});
	req.session.cart[index].size = req.query.size;
		return res.json({
			products : req.session.cart
		});
});

router.post('/sign-in-order', (req, res) => {
	let details = (cart) => {
		let restoreDetails = [];
		let total = 0;

		cart.forEach(detail => {
			total += (detail.promo_price !== 0 ) ? detail.unit_price : detail.promo_price;
			restoreDetails.push({
				product_id : detail.product_id,
				product_name : detail.product_name,
				price : (detail.promo_price !== 0 ) ? detail.unit_price : detail.promo_price,
				quantity : detail.product_quantity,
				category_name : detail.product_category,
				colors : detail.color,
				size :  detail.size
			});
		});

		return {
			detailsArr : restoreDetails,
			billTotal : total
		};
	}; 

	let data = details(req.session.cart);

	let bill = new Bill({
		total : data.billTotal,
		status : config.status.new,
		note: req.body.note,
		address : req.user.address,
		phone: req.user.phone,
		user : req.user._id,
		detais : data.detailsArr
	}); 


	bill.save(function (err, results) {
		if(err){
			return res.send({
				messages : err
			});
		} 
		eventEmitter.emit('sendConfirmOrderMail', {
			items : data.detailsArr,
			user : req.user,
			total : data.billTotal
		});
		req.app.io.emit('notifiNewBills', {
            content : 'Có đơn đặt hàng mới !',
		});
		req.session.cart = undefined;
		return res.send({
			messages : 'sucessfull!',
			details : data.detailsArr,
			total : data.billTotal,
			user : req.user
		});
	}); 

});

router.get('/cart-data-api', function(req, res, next){
	Category.find({}, {_id : 1, name : 1, type : 1})
		.exec((err, categories) => {
			return res.send({
				cart : (req.session.cart) ? req.session.cart.length : 0,
				user : req.user,
				total : coutCartTotal(req.session.cart),
				category : categories,
				products : (req.session.cart ) ? req.session.cart : []
			});
		});
});

module.exports = router;
