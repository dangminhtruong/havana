/*
* Author : Dang Minh Truong
* Email : xdangminhtruongx@gmail.com
*/
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const user = require('../../model/user');
const seeder = require('mongoose-seed');
const faker = require('faker');

new Promise((resolve) => {
	mongoose.connect('mongodb://mongodb:27017/havana', {
		useMongoClient: true,
		promiseLibrary: require('bluebird')
	});
	user.find({}, { _id: 1 })
		.exec((err, user_ids) => {
			resolve(user_ids);
			mongoose.connection.close();
		});
}).then((users) => {
	return new Promise((resolve) => {
		let item = [];
		for (i = 0; i < 10; i++) {
			item.push({
				title: faker.lorem.sentences(),
				content: faker.lorem.text(),
				avata: 'avata.jpg',
				user: "5ae5cf56b8477206a3480419",
				comment: [

				]
			});
		};
		resolve(item);
	}).then((item) => {
		seeder.connect('mongodb://mongodb:27017/havana', function () {
			let data = [{
				'model': 'Blog',
				'documents': item
			}];
			seeder.loadModels([
				'../../model/blog'
			]);
			seeder.clearModels(['Blog'], function () {
				seeder.populateModels(data, function () {
					seeder.disconnect();
				});
			});
		});
	});
});
