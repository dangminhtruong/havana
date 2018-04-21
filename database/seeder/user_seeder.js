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
	mongoose.connect('mongodb://truongdang:789852@ds131989.mlab.com:31989/havana', {
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
		for(i=0; i< 5; i++){
			items.push(
				{
					username : faker.internet.userName(),
					avata : 'avata.jpg',
					address : faker.address.streetAddress(),
					email : faker.internet.email(),
					password : '777',
					phone : faker.phone.phoneNumber(),
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
					notification : [
						{
							content : 'Có đơn đặt hàng mới'
						},
						{
							content : 'Có thêm user vừa đăng ký'
						},
						{
							content : 'Bạn có 5 tin nhắn mới chưa xem'
						},
						{
							content : 'Có 2 đơn đặt hàng mới'
						},
						{
							content : 'Có thêm 3 user vừa đăng ký'
						},
						{
							content : 'Bạn có 7 tin nhắn mới chưa xem'
						}
					],
				}
			);
		}
		resolve(items);
	});
}).then((items) => {
	seeder.connect('mongodb://truongdang:789852@ds131989.mlab.com:31989/havana', function() {
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
