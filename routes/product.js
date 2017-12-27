var express = require('express');
var router = express.Router();
const Product = require('../model/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    let Item =  new Product({
        name : 'Quần jean B11',
        unit_price : 18000,
        promo_price : 15000,
        slug_name : 'quan-jean-b11-nam',
        descript: 'Quần jean B11...',
        image : 'ao_so_mi_a88.jpg',
        status : 2,
        quantity : 20,
        couter : Number,
        category_id : '5a421ad5d4b2d8181e9fac31',
        size : [
            { name :  'XL' },
            { name :  'L' },
            { name :  'M' },
            { name : 'XXL' }
        ],
        image_detais : [
            { name : 'ao1.jpg' },
            { name : 'ao2.jpg' },
            { name : 'ao3.jpg' }
        ],
    });

    Item.save((err)=>{
        if(err){ console.log(err) };
        res.send('ok');
    });
});

module.exports = router;
