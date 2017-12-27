var express = require('express');
var router = express.Router();
const Category = require('../model/category');

/* GET home page. */
router.get('/', function(req, res, next) {
    // let Cate = new Category({
    //     name : 'Quần nữ',
    //     descript : 'Quần cho nữ',
    //     type : 2,
    // });

    // Cate.save((err) => {
    //     if(err){
    //         console.log(err);
    //     }
    //     res.send('ok');
    // }); 
    res.render('./pages/category');

});

module.exports = router;
