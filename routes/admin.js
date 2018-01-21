var express = require('express');
var router = express.Router();
const async = require('async');
const Category = require('../model/category');
const Bill = require('../model/bill');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var weekly = require('../helpers/line_chart_data');


/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

router.get('/', function(req, res, next) {
    res.render('./admin/index');
});
/*--------------------------------------------------------*/
router.get('/category/add', (req, res, next) => {
    res.render('./admin/pages/add_category');
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
/*--------------------------------------------------------*/
router.get('/line-chart', (req, res, next) => {
    weekly(req, res);
});
/*--------------------------------------------------------*/
router.get('/product/add', (rwq, res, next) => {
    res.render('./admin/pages/add_product');
});
/*--------------------------------------------------------*/
module.exports = router;
