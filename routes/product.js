const express = require('express');
const router = express.Router();
const async = require('async');
const Product = require('../model/product');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    async.parallel([
        function(callback){
            Product.find({ _id : req.params.id})
            .exec((err, product) => {
                callback(null, product);
            });
        },
        function(callback){
            Product.find().sort({ createdOn : -1 }).limit(4)
            .exec((err, related_product) => {
                callback(null, related_product);
            });
        }
    ], 
    function(err, results){
        res.render('./pages/product', {
            product : results[0][0],
            related_product : results[1]
        });
    });
  
});

module.exports = router;
