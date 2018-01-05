const bill = require('./bill_seeder');
const category = require('./category_seeder');
const product = require('./product_seeder');
const user = require('./user_seeder');

async function dbseed() {
    await category();
    await product();
    await user();
    await bill();
     console.log('data generate successfull');
}