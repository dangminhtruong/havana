/*
* Author : Dang Minh Truong
* Email : xdangminhtruongx@gmail.com
*/

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seed');
const Category = require('../../model/category');
const _ = require('lodash');
var faker = require('faker');

new Promise((resolve) => {
	mongoose.connect('mongodb://localhost:27017/havana', {
		useMongoClient: true,
		promiseLibrary: require('bluebird')
	});
	Category.find({}, { _id : 1 })
		.exec((err, category_ids) => {
			resolve(category_ids);
			mongoose.connection.close();
		});
}).then((category_ids) => {
	return new Promise((resolve) => {
		let items = [];
		let status = [1, 2];
		for(i=0; i< 150; i++){
			items.push(
				{
					name : faker.commerce.productName(),
					unit_price : faker.commerce.price(),
					promo_price : faker.commerce.price(),
					slug_name : faker.helpers.slugify(),
					descript: faker.lorem.paragraph(),
					image : 'product.jpg',
					status : _.sample(status),
					quantity : faker.random.number(),
					saled : 0,
					category_id : _.sample(category_ids)._id,
					size : ['XL','L','M'],
					color : [
						faker.commerce.color(),
						faker.commerce.color(),
						faker.commerce.color(),
						faker.commerce.color(),
						faker.commerce.color() 
					],
					image_detais : [],
					rate : [],
					comment : []
				}
			);
		}
		resolve(items);
	});
}).then((items) => {
	seeder.connect('mongodb://localhost:27017/havana', function() {
		let data = [{
			'model': 'Product',
			'documents': items
		}];
		seeder.loadModels([
			'../../model/product'
		]);
		seeder.clearModels(['Product'], function() {
			seeder.populateModels(data, function() {
				seeder.disconnect();
			});
		});
	});
});
