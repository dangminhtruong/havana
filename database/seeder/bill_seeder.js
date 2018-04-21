/*
* Author : Dang Minh Truong
* Email : xdangminhtruongx@gmail.com
*/

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seed');
const async = require('async');
const Product = require('../../model/product');
const Category = require('../../model/category');
const User = require('../../model/user');
const _ = require('lodash');
var faker = require('faker');

new Promise((resolve) => {
	mongoose.connect('mongodb://truongdang:789852@ds131989.mlab.com:31989/havana', {
		useMongoClient: true,
		promiseLibrary: require('bluebird')
	});
	async.parallel([
		(callback) => {
			Product.find({}, { _id : 1, name : 1 })
				.exec((err, product_ids) => {
					callback(null, product_ids);
				}); 
		},
		(callback) => {
			User.find({}, { _id : 1 })
				.exec((err, user_ids) => {
					callback(null, user_ids);
				});
		},
		(callback) => {
			Category.find({}, { _id : 1 })
				.exec((err, category_ids) => {
					callback(null, category_ids);
				}); 
		}
	], 
	(err, results) => {
		resolve(results);
		mongoose.connection.close();
	});
}).then((results) => {
	return new Promise((resolve) => {
		let items = [];
		let sizes = ["XXL", "XL", "L", "M"]
		let status = [1, 2, 3, 4];
		for(i=0; i< 150; i++){
			items.push(
				{
					total : faker.commerce.price(),
					status : _.sample(status),
					note: faker.lorem.sentences(),
					address : faker.address.streetName(),
					phone: faker.phone.phoneNumber(),
					user : _.sample(results[1])._id,
					detais : [
						{
							product_id : _.sample(results[0])._id,
							product_name : _.sample(results[0]).name,
							price : faker.random.number(),
							quantity : faker.random.number(),
							category_name : faker.commerce.productName(),
							colors : faker.commerce.color(),
							size : _.sample(sizes)
						},
						{
							product_id : _.sample(results[0])._id,
							product_name : _.sample(results[0]).name,
							price : faker.random.number(),
							quantity : faker.random.number(),
							category_name : faker.commerce.productName(),
							colors : faker.commerce.color(),
							size : _.sample(sizes)
						},
						{
							product_id : _.sample(results[0])._id,
							product_name : _.sample(results[0]).name,
							price : faker.random.number(),
							quantity : faker.random.number(),
							category_name : faker.commerce.productName(),
							colors : faker.commerce.color(),
							size : _.sample(sizes)
						},
						{
							product_id : _.sample(results[0])._id,
							product_name : _.sample(results[0]).name,
							price : faker.random.number(),
							quantity : faker.random.number(),
							category_name : faker.commerce.productName(),
							colors : faker.commerce.color(),
							size : _.sample(sizes)
						}
						
					]
				}
			);
		}
		resolve(items);
	});
}).then((items) => {
	seeder.connect('mongodb://truongdang:789852@ds131989.mlab.com:31989/havana', function() {
		let data = [{
			'model': 'Bill',
			'documents': items
		}];
		seeder.loadModels([
			'../../model/bill'
		]);
		seeder.clearModels(['Bill'], function() {
			seeder.populateModels(data, function() {
				seeder.disconnect();
			});
		});
	});
});
