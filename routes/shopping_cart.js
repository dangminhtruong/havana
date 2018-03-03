const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Product = require('../model/product');
const Bill = require('../model/bill');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

router.get('/add/:id', function(req, res, next) {
	let sess = req.session;
    
	if(!sess.cart){
		Product.findOne({ _id : req.params.id })
			.exec((err, product) => {
				sess.cart = [
					{
						product_id : req.params.id,
						product_name : product.name,
						unit_price : product.unit_price,
						promo_price : product.promo_price,
						product_quantity : 1,
						product_img : product.image
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
		if(check >= 0 ){
			sess.cart[check].product_quantity += 1;
			res.send({
				cart_items : sess.cart.length
			});
		}
		//------------------------
		else{
			Product.findOne({ _id : req.params.id })
				.exec((err, product) => {
					sess.cart.push(
						{
							product_id : req.params.id,
							product_name : product.name,
							unit_price : product.unit_price,
							promo_price : product.promo_price,
							product_quantity : 1,
							product_img : product.image
						}
					);
				}).then(() => {
					res.send({
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
			items : req.session.cart
		});
	} catch (error) {
		res.send('failed');
	}
  
});

router.get('/details', function(req, res, next) {
	res.render('./pages/view_cart', {
		cart : req.session.cart,
		user : req.user
	});
});


router.get('/cart-data', function(req, res){
	res.send({
		items : req.session.cart
	});
});

router.get('/update-quantity/:id', (req, res) => {
	
	req.session.cart[_.findIndex(req.session.cart, { product_id : req.params.id })]
		.product_quantity = req.query.newQuantity;
	res.send({
		items : req.session.cart
	});
});

router.post('/sign-in-order', urlencodedParser , (req, res) => {
	let details = (cart) => {
		let restoreDetails = [];
		cart.forEach(detail => {
			restoreDetails.push({
				product_id : detail.product_id,
				product_name : detail.product_name,
				price : (detail.promo_price !== 0 ) ? detail.unit_price : null,
				quantity : detail.product_quantity
			});
		});

		return restoreDetails;
	} 

	let bill = new Bill({
		total : 5000,
		status : 2,
		note: req.body.note,
		address : req.body.address,
		phone: req.body.phone,
		user : req.body.user,
		detais : details(req.session.cart)
	}); 

	bill.save(function (err, results) {
		if(err){
			return res.send({
				messages : err
			});
		} 
		req.session.cart = undefined;
		return res.send({
			messages : ' sucessfull!'
		});
	}); 
});


module.exports = router;
