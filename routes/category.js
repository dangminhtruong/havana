var express = require('express');
var router = express.Router();
const Category = require('../model/category');

/* GET home page. */
router.get('/', function(req, res, next) {
    let Cate = new Category({
        name : 'Woman',
        descript : 'Woman\'s fashion',
        parent_id : '00a00b00c00d',
    });

    Cate.save((err) => {
        if(err){
            console.log(err);
        }
        res.send('ok');
    });
});

module.exports = router;
