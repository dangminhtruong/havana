var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
var moment = require('moment');
/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

var ProductSchema = new mongoose.Schema({
	name : String,
	unit_price : { type : Number, default : 0 },
	promo_price : Number,
	slug_name : String,
	descript: String,
	image : String,
	status : Number,
	quantity : Number,
	saled : Number,
	category_id : { type: ObjectId, ref : 'Category'},
	size : [String],
	color : [String],
	image_detais : [String],
	rate : [
		{
			star : Number,
			user_id : { type: ObjectId, ref : 'User'}
		}
	],
	comment : [
		{
			user_name : String,
			content : String,
			reply : [
				{
					user_name : String,
					content : String,
					createdOn: { type: Date, 'default': Date.now }
				}
			],
			createdOn: { type: Date, 'default': Date.now }
		}
	],
	createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);