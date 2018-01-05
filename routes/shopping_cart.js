const express = require('express');
const router = express.Router();
const async = require('async');
const _ = require('lodash');
const Product = require('../model/product');

/*
* Author : Dang Minh Truong
*/

router.get('/add/:id', function(req, res, next) {
    let sess = req.session;
    if(!sess.cart){
        Product.findOne({ _id : req.params.id })
        .exec((err, product) => {
            sess.cart = [
                {
                    product_id : req.params.id,
                    product_name : product.name,
                    product_quantity : 1
                }
            ]
        }).then(() => {
            res.send('add cart successfull');
        });
    }else{
        let check = _.findIndex(sess.cart, { 'product_id': req.params.id });
        if(check >= 0 ){
            sess.cart[check].product_quantity += 1;
            res.send('add cart successfull');
        }else{
            Product.findOne({ _id : req.params.id })
            .exec((err, product) => {
                sess.cart.push(
                    {
                        product_id : req.params.id,
                        product_name : product.name,
                        product_quantity : 1
                    }
                )
            }).then(() => {
                res.send('add cart successfull');
            });
        } 
    }
});

router.get('/remove/:id', (req, res, next) => {
    let sess = req.session;
    let index = req.params.id;
    _.remove(sess.cart, function(index) {
        return index;
    });
    res.send('dasd');
});

module.exports = router;
