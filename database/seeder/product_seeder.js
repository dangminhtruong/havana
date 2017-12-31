var seeder = require('mongoose-seed');
const Product = require('../model/product');
const Category = require('../model/category');
var faker = require('faker');

seeder.connect('mongodb://localhost:27017/havana', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    '../model/product'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Category'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});

const data = [
    {
        'model': 'Product',
        'documents': [
            {
                name : ,
                unit_price : Number,
                promo_price : Number,
                slug_name : String,
                descript: String,
                image : String,
                status : Number,
                quantity : Number,
                saled : Number,
                category_id : { type: ObjectId, ref : 'Category'},
                size : [
                    { name :  String }
                ],
                image_detais : [
                    { name : String }
                ],
                rate : [
                    {
                        star : Number,
                        user_id : { type: ObjectId, ref : 'User'}
                    }
                ],
                comment : [
                    {
                        user_name : String,
                        content : String,
                        reply : [
                            {
                                user_name : String,
                                content : String,
                                createdOn: { type: Date, 'default': Date.now }
                            }
                        ],
                        createdOn: { type: Date, 'default': Date.now }
                    }
                ]
            }
        ]
    }
];