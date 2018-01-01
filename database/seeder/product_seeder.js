var seeder = require('mongoose-seed');
const Category = require('../../model/category');
var faker = require('faker');




seeder.connect('mongodb://localhost:27017/havana', function() {
    seeder.loadModels([
        '../../model/product'
    ]);
    seeder.clearModels(['Category'], function() {
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
                 name : faker.commerce.productName(),
                 unit_price : faker.commerce.price(),
                 promo_price : faker.commerce.price(),
                 slug_name : faker.helpers.slugify(),
                 descript: faker.lorem.paragraph(),
                 image : 'product.jpg',
                 status : 1,
                 quantity : faker.random.number(),
                 saled : 0,
                 category_id : null,
                 size : [
                     { name :  'XL' },
                     { name :  'L' },
                     { name :  'M' },
                 ],
                 image_detais : [
                    
                 ],
                 rate : [
                    
                 ],
                 comment : [
                    
                 ]
             }
         ]
     }
 ];