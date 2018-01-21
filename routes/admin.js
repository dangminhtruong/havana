var express = require('express');
var router = express.Router();
const async = require('async');
const Category = require('../model/category');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

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
        res.render('./admin/pages/add_category', {
            categories : categories
        });
    });
});
/*--------------------------------------------------------*/
router.post('/category/add', urlencodedParser , (req, res, next) => {
    let cate = new Category({
        name : req.body.name,
        type : req.body.type,
        descript : req.body.desc
    })
    cate.save(function (err, results) {
        res.send({
            status : 'inserted'
         });
    });
    
});

module.exports = router;
