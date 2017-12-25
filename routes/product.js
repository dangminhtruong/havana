var express = require('express');
var router = express.Router();
const Product = require('../model/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    let Item =  new Product({
        name : 'Áo khoác hoodie nam',
        unit_price : 18000,
        promo_price : 15000,
        slug_name : 'ao-hoodie-nam',
        descript: 'Áo hoodie nam...',
        image : 'ao_hoodie_nam.jpg',
        status : 2,
        quantity : 20,
        category_id : '5a409a5252dd7e1d48675900',
        size : [
            { name :  'XL' },
            { name :  'L' },
            { name :  'M' },
            { name : 'XXL' }
        ],
        image_detais : [
            { name : 'ao_hoodie_nam1.jpg' },
            { name : 'ao_hoodie_nam2.jpg' },
            { name : 'ao_hoodie_nam3.jpg' }
        ],
    });

    Item.save((err)=>{
        if(err){ console.log(err) };
        res.send('ok');
    });
});

module.exports = router;
