var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProductSchema = new mongoose.Schema({
        name : String,
        unit_price : Number,
        promo_price : Number,
        slug_name : String,
        descript: String,
        image : String,
        status : Number,
        quantity : Number,
        category_id : { type: ObjectId, ref : 'Category'},
        size : [
            { name :  String }
        ],
        image_detais : [
            { name : String }
        ],
        createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);