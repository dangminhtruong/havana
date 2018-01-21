/*
* Author : Dang Minh Truong
* Email : xdangminhtruongx@gmail.com
*/

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seed');
const async = require('async');
const Product = require('../../model/product');
const User = require('../../model/user');
const _ = require('lodash');
var faker = require('faker');

new Promise((resolve) => {
    mongoose.connect('mongodb://localhost:27017/havana', {
        useMongoClient: true,
        promiseLibrary: require('bluebird')
    });
    async.parallel([
        (callback) => {
            Product.find({}, { _id : 1 })
            .exec((err, product_ids) => {
                callback(null, product_ids);
            }); 
        },
        (callback) => {
            User.find({})
            .exec((err, user_ids) => {
                callback(null, user_ids);
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
        let status = [1, 2]
        for(i=0; i< 150; i++){
            items.push(
                {
                    total : faker.commerce.price(),
                    status : _.sample(status),
                    note: faker.lorem.text(),
                    address : faker.address.streetName(),
                    phone: faker.phone.phoneNumber(),
                    user_id : _.sample(results[0])._id,
                    detais : [
                        {
                            product_id : _.sample(results[1])._id,
                            product_name : _.sample(results[1]).name,
                            price : _.sample(results[1]).unit_price,
                            quantity : faker.random.number()
                        },
                        {
                            product_id : _.sample(results[1])._id,
                            product_name : _.sample(results[1]).name,
                            price : _.sample(results[1]).unit_price,
                            quantity : faker.random.number()
                        },
                        {
                            product_id : _.sample(results[1])._id,
                            product_name : _.sample(results[1]).name,
                            price : _.sample(results[1]).unit_price,
                            quantity : faker.random.number()
                        },
                        {
                            product_id : _.sample(results[1])._id,
                            product_name : _.sample(results[1]).name,
                            price : _.sample(results[1]).unit_price,
                            quantity : faker.random.number()
                        },
                        {
                            product_id : _.sample(results[1])._id,
                            product_name : _.sample(results[1]).name,
                            price : _.sample(results[1]).unit_price,
                            quantity : faker.random.number()
                        },
                        {
                            product_id : _.sample(results[1])._id,
                            product_name : _.sample(results[1]).name,
                            price : _.sample(results[1]).unit_price,
                            quantity : faker.random.number()
                        }
                    ]
                }
            );
        }
        resolve(items);
    });
}).then((items) => {
    seeder.connect('mongodb://localhost:27017/havana', function() {
        let data = [{
            'model': 'Bill',
            'documents': items
        }]
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
