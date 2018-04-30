var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
var User = require('../model/user');

/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

var BlogSchema = new mongoose.Schema({
	title : String,
	content : String,
	user : { type: ObjectId, ref : 'User'},
	createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);