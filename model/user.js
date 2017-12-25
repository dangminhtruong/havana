var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
    user_name : String,
    address : String,
    email : String,
    password : String,
    role : Number,
    status : Number,
    bills : [
        {
            total : Number,
            status : Number,
            note: String,
            address : String,
            phone: String,
            detais : [
                {
                    product_id : { type: ObjectId, ref : 'Product'},
                    price : Number,
                    quantity : Number
                }
            ]
        }
    ],
    post : [
        {
            title : String,
            content : String
        }
    ],
    wish_list : [
        {
            product_id : { type: ObjectId, ref : 'Product'}
        }
    ],
    rate : [
        {
            star : Number,
            product_id : { type: ObjectId, ref : 'Product'}
        }
    ],
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('User', UserSchema);