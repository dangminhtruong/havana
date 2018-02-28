const express = require('express');
const router = express.Router();
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

router.post('/order', (req, res) => {

});


module.exports = router;
