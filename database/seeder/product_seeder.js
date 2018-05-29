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
	mongoose.connect('mongodb://mongodb:27017/havana', {
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
		let sizes = ["XXL", "XL", "L", "M", "S"];
		let avas = ['pi.png', 'pi2.png', 'pi3.png', 'pi4.png', 'pi5.png', 
					'pi6.png', 'pi7.png' , 'm1.jpg', 'm2.jpg', 'm4.jpg', 'w1.jpg',
					'a1.jpg', 'a2.jpg', 'a3.jpg', 'a4.jpg', 'a5.jpg', 'a6.jpg', 
					'a7.jpg', 'a8.jpg', 'a9.jpg', 'a10.jpg', 'a11.jpg', 'a12.jpg',
					'b1.jpg', 'b2.jpg', 'b3.jpg', 'b4.jpg', 'b5.jpg', 'b6.jpg', 
					'b7.jpg', 'b8.jpg', 'b9.jpg', 'b10.jpg', 'b11.jpg', 'b12.jpg'
					];
		for(i=0; i< 150; i++){
			items.push(
				{
					name : faker.commerce.productName(),
					unit_price : faker.commerce.price(),
					promo_price : faker.commerce.price(),
					slug_name : faker.helpers.slugify(),
					descript: faker.lorem.paragraph(),
					image : _.sample(avas),
					status : _.sample(status),
					quantity : faker.random.number(),
					saled : 0,
					category_id : _.sample(category_ids)._id,
					colors : [
						{
							code : faker.commerce.color(),
							quantity : faker.random.number()
						},
						{
							code : faker.commerce.color(),
							quantity : faker.random.number()
						},
						{
							code : faker.commerce.color(),
							quantity : faker.random.number()
						},
						{
							code : faker.commerce.color(),
							quantity : faker.random.number()
						}
					],
					size : [
						{
							code : _.sample(sizes),
							quantity : faker.random.number()
						},
						{
							code : _.sample(sizes),
							quantity : faker.random.number()
						},
						{
							code : _.sample(sizes),
							quantity : faker.random.number()
						},
						{
							code : _.sample(sizes),
							quantity : faker.random.number()
						}
					],
					image_details : ['pi.png', 'pi2.png', 'pi3.png'],
					rate : { star : 3,  summary : 8 },
					comment : [
						{
							user_name : 'dangminhtruong',
							avata : 'commentavt1.jpg',
							content : faker.lorem.paragraph(),
							reply : [
							
							],
						},
						{
							user_name : 'thanhuyen',
							avata : 'commentavt2.jpg',
							content : faker.lorem.paragraph(),
							reply : [
							
							],
						}
					]
				}
			);
		}
		resolve(items);
	});
}).then((items) => {
	seeder.connect('mongodb://mongodb:27017/havana', function() {
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
