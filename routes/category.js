var express = require('express');
var router = express.Router();
const Category = require('../model/category');

/* GET home page. */
router.get('/', function(req, res, next) {
    let Cate = new Category({
        name : 'Quần jean nam',
        descript : 'Quần Jean cho nam',
        parent_id : '5a40999f923d1d098cec743a',
    });

    Cate.save((err) => {
        if(err){
            console.log(err);
        }
        res.send('ok');
    });
});

module.exports = router;
