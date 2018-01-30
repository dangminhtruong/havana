/*
* Author : Dang Minh Truong
* Email : xdangminhtruongx@gmail.com
*/

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seed');
const Product = require('../../model/product');
const _ = require('lodash');
var faker = require('faker');

new Promise((resolve) => {
	mongoose.connect('mongodb://localhost:27017/havana', {
		useMongoClient: true,
		promiseLibrary: require('bluebird')
	});
	Product.find({}, { _id : 1 })
		.exec((err, product_ids) => {
			resolve(product_ids);
			mongoose.connection.close();
		});
}).then((product_ids) => {
	return new Promise((resolve) => {
		let items = [];
		let status = [1, 2];
		for(i=0; i< 150; i++){
			items.push(
				{
					username : faker.name.findName(),
					address : faker.internet.email(),
					email : faker.address.streetAddress(),
					password : '777',
					role : 1,
					status : _.sample(status),
					wish_list : [
						{
							product_id : _.sample(product_ids)._id,
						},
						{
							product_id : _.sample(product_ids)._id,
						},
						{
							product_id : _.sample(product_ids)._id,
						},
						{
							product_id : _.sample(product_ids)._id,
						},
						{
							product_id : _.sample(product_ids)._id,
						}
					],
				}
			);
		}
		resolve(items);
	});
}).then((items) => {
	seeder.connect('mongodb://localhost:27017/havana', function() {
		let data = [{
			'model': 'User',
			'documents': items
		}];
		seeder.loadModels([
			'../../model/user'
		]);
		seeder.clearModels(['User'], function() {
			seeder.populateModels(data, function() {
				seeder.disconnect();
			});
		});
	});
});
