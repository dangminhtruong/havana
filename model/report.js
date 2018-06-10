var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

var ReportSchema = new mongoose.Schema({
        path : String,
        title : String,
        createdOn : { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);
