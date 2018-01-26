const express = require('express');
const router = express.Router();
const async = require('async');
const _ = require('lodash');
const Product = require('../model/product');

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
						product_quantity : 1
					}
				];
			}).then(() => {
				console.log(sess.cart);
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
			console.log(sess.cart);
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
							product_quantity : 1
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
	let sess = req.session;
	let index = req.params.id;

	try {
		_.remove(sess.cart, function(index) {
			return index;
		});
		res.send('success');
	} catch (error) {
		res.send('failed');
	}
  
});

router.get('/details', function(req, res, next) {
	res.render('./pages/view_cart', {
		cart : req.session.cart
	});
});

module.exports = router;
