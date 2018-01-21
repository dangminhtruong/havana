var express = require('express');
var router = express.Router();
const async = require('async');
const Category = require('../model/category');

/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

router.get('/', function(req, res, next) {
    res.render('./admin/index');
});
/*--------------------------------------------------------*/
router.get('/category/add', (req, res, next) => {
    Category.find({}, {_id : 1, name : 1 })
    .exec((err, categories) => {
        res.render('./admin/add_category', {
            categories : categories
        });
    });
});
/*--------------------------------------------------------*/
router.post('/category/add', (req, res, next) => {
    
});

module.exports = router;
