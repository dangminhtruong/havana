/*
* Author : Dang Minh Truong
* Email : xdangminhtruongx@gmail.com
*/
const seeder = require('mongoose-seed');
const faker = require('faker');

seeder.connect('mongodb://mongodb:27017/havana', function() {

	seeder.loadModels([
		'../../model/blog'
	]);
	seeder.clearModels(['Blog'], function() {
		seeder.populateModels(data, function() {
			seeder.disconnect();
		});
 
	});
});

const data = [
	{
		'model': 'Blog',
		'documents': [
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [

				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
			},
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
			},
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
			},
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
			},
			{
				title : faker.lorem.sentences(),
				content : faker.lorem.paragraphs(),
				avata : 'avata.jpg',
				user : "5ae5cf56b8477206a3480419",
				comment : [
					
				]
            },
		]
	}
];