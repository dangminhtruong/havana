var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BillSchema = new mongoose.Schema({
    total : Number,
    status : Number,
    note: String,
    address : String,
    phone: String,
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