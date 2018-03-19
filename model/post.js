var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

var PostSchema = new mongoose.Schema({
    
        title : String,
        content : String,
        user_id :  { type: ObjectId, ref : 'User'},
        user_name : String,
        comment : [
            {
                user_name : String,
                content : String,
                createdOn: { type: Date, 'default': Date.now }
            }
        ]
    ,
    createdOn : { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('PostSchema', PostSchema);