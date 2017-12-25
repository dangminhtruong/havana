var express = require('express');
var router = express.Router();
const async = require('async');
const Product = require('../model/product');
const Category = require('../model/category');
/* GET home page.... */
router.get('/', function(req, res, next) {
    async.parallel([
        function(callback){
            Product.find({ quantity : { $gt : 0 }  }).sort( { createdOn: -1 } ).limit(4)
            .exec((err, news) => {
                callback(null, news);
            })
        },
        function(callback){
            Product.find({ status : 2, quantity : { $gt : 0 } }).limit(4)
            .exec((err, feaure) => {
                callback(null, feaure);
            })
        }
    ],
    // Call back
    function(err, results) {
        if(err){
            console.log(err);
        }
        res.render('index',{
            news : results[0],
            features : results[1]
        });
    });
});

module.exports = router;
