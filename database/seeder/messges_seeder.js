/*
* Author : Dang Minh Truong
* Email : xdangminhtruongx@gmail.com
*/
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seed');
const faker = require('faker');
const User = require('../../model/user');
const _ = require('lodash');


new Promise((resolve) => {
    mongoose.connect('mongodb://mongodb:27017/havana', {
        useMongoClient: true,
        promiseLibrary: require('bluebird')
    });
    User.find({}, { _id: 1, username: 1 })
        .exec((err, users) => {
            resolve(users);
            mongoose.connection.close();
        });
}).then((users) => {

    return new Promise((resolve) => {
        let conversation = [];
        for (i = 0; i < 2; i++) {
            conversation.push({
                members: [_.sample(users)._id, _.sample(users)._id],
                user_name: faker.internet.userName(),
                status: _.sample([1, 2, 3, 4]),
                message: faker.lorem.paragraph()
            });

        }
        const data = [
            {
                'model': 'Messages',
                'documents': conversation
            }
        ];
        resolve(data);
    }).then((data) => {
        seeder.connect('mongodb://mongodb:27017/havana', function () {

            seeder.loadModels([
                '../../model/messages'
            ]);
            seeder.clearModels(['Messages'], function () {
                seeder.populateModels(data, function () {
                    seeder.disconnect();
                });

            });
        });
    });
})
