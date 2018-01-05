const express = require('express');
const router = express.Router();
const async = require('async');
const Category = require('../model/category');
const Product = require('../model/product');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    async.parallel([
        (callback) => {
            if(req.query.pages != null){
                Product.find({ category_id : req.params.id }).limit(6).skip((req.query.pages-1)* 6)
                .exec((err, category_products) => {
                    callback(null, category_products);
                });
            }else{
                Product.find({ category_id : req.params.id }).limit(6)
                .exec((err, category_products) => {
                    callback(null, category_products);
                });
            }
           
        },
        (callback) => {
            Product.find().sort({ createdOn : -1 }).limit(3)
            .exec((err, latest_products) => {
                callback(null, latest_products);
            });
        },
        (callback) => {
            Product.find().sort({ saled : -1 }).limit(3)
            .exec((err, best_sales) => {
                callback(null, best_sales);
            });
        },
        (callback) => {
            Product.find({ category_id : req.params.id }).count()
            .exec((err, total_records) => {
                callback(null, total_records);
            });
        }
    ], 
    (err, results) => {
        res.render('./pages/category', {
            category_products :  results[0],
            latest_products : results[1],
            best_sales : results[2],
            pages :  Math.ceil(results[3] / 6),
            category_current : req.params.id
        });
    });
    
});

module.exports = router;
