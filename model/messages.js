var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

var MessageSchema = new mongoose.Schema({
    members : [ObjectId],
	messages : [
		{
            user_name : String,
            status : Number,
			message : String
		}
	],
	createdOn: { type: Date, 'default': Date.now }
});


module.exports = mongoose.model('Messages', MessageSchema);