/*
* Author : Dang Minh Truong
* Email : xdangminhtruongx@gmail.com
*/
const seeder = require('mongoose-seed');
const faker = require('faker');

seeder.connect('mongodb://mongodb:27017/havana', function() {

	seeder.loadModels([
		'../../model/category'
	]);
	seeder.clearModels(['Category'], function() {
		seeder.populateModels(data, function() {
			seeder.disconnect();
		});
 
	});
});

const data = [
	{
		'model': 'Category',
		'documents': [
			{
				name : 'Áo sơ mi nam',
				descript : 'Các loaị áo sơ mi nam',
				type : 1,
			},
			{
				name : 'Áo khoác nam',
				descript : 'Các loaị áo khoác nam',
				type : 1,
			},
			{
				name : 'Quần jean nam',
				descript : 'Các loaị quần jean nam',
				type : 1,
			},
			{
				name : 'Giày dép nam',
				descript : 'Các loaị giày dép nam',
				type : 1,
			},
			//--------------
			{
				name : 'Áo sơ mi nữ',
				descript : 'Các loaị áo sơ mi nữ',
				type : 2,
			},
			{
				name : 'Áo khoác nữ',
				descript : 'Các loaị áo khoác nữ',
				type : 2,
			},
			{
				name : 'Quần jean nữ',
				descript : 'Các loaị quần jean nữ',
				type : 2,
			},
			{
				name : 'Giày dép nam',
				descript : 'Các loaị giày dép nữ',
				type : 2,
			},
			{
				name : 'Váy, đầm thời trang',
				descript : 'Các váy, đầm nữ',
				type : 2,
			}
		]
	}
];