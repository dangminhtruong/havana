var express = require('express');
var router = express.Router();
const User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    let Truong = User({
        user_name : 'Đặng Minh Trường',
        address : 'Gia Lâm - Hà Nội',
        email : 'xdangminhtruõng@gmail.com@gmail.com',
        password : '123',
        role : 1,
        status : 2,
        bills : [
            {
                total : 35000,
                status : 1,
                note: 'Vui lòng giao sản phẩm trước 12h',
                address : 'Hà Nội',
                phone: '0968332266',
                detais : [
                    {
                        product_id : '5a4071e60af75a1870a89fc9',
                        price : 350000,
                        quantity : 1
                    }
                ]
            },
            {
                total : 82000,
                status : 1,
                note: 'Vui lòng giao hàng sớm',
                address : 'Hà Nội',
                phone: '0968332266',
                detais : [
                    {
                    product_id : '5a4071e60af75a1870a89fc2',
                    price : 120000,
                    quantity : 1
                    },
                    {
                    product_id : '5a4071e60af75a1870a89fc9',
                    price : 350000,
                    quantity : 2
                    }
                ]
            }
        ],
        post : [
            {
                title : 'Áo sơ mi, mặc thế nào cho đẹp ?',
                content : 'Lorem inspum....'
            }
        ],
        wish_list : [

        ],
        rate : [

        ]
    });

    Truong.save((err)=>{
        if(err){
            console.log(err);
        }
        console.log('Truong created');
        res.send('ok');
    });
});

module.exports = router;
