var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

var CategorySchema = new mongoose.Schema({
    name : String,
    descript : String,
    type : Number,
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);