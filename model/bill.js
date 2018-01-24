var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var User = require('../model/user');

/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

var BillSchema = new mongoose.Schema({
    total : Number,
    status : Number,
    note: String,
    address : String,
    phone: String,
    userId : { type: ObjectId, ref : 'User'},
    detais : [
        {
            product_id : { type: ObjectId, ref : 'Product'},
            product_name : String,
            price : Number,
            quantity : Number
        }
    ],
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Bill', BillSchema);