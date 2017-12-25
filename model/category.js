var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CategorySchema = new mongoose.Schema({
    name : String,
    descript : String,
    parent_id : ObjectId,
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);