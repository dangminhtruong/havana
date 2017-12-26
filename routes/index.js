var express = require('express');
var router = express.Router();
const async = require('async');
const Product = require('../model/product');
const Category = require('../model/category');
const q = require('../database/queries/find');
/* GET home page.... */

function f(){
    return Product.find({ status : 2, quantity : { $gt : 0 } });
}

router.get('/', function(req, res, next) {
    
    async.parallel([
        function(callback){
            Product.find().sort( { createdOn: -1 } ).limit(4)
            .exec((err, news) => {
                callback(null, news);
            })
        },
        function(callback){
            q(Product, { quantity : { $gt : 0 }  }).limit(4).exec((err, result) => {
                callback(null, result)
            })
        }
    ],
    // Call back
    function(err, results) {
        if(err){
            console.log(err);
        }

        // res.render('index',{
        //     news : results[0],
        //     features : results[1]
        // });
    });
});

module.exports = router;
