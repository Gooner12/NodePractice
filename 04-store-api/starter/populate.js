// We use this file to populate data from products.json to the database
require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany(); // this statement removes all the existing products in the database
        await Product.create(jsonProducts)
        console.log('Success!');
        process.exit(0) // this code makes an exit from the current setup using global variable process. Zero means everything went well.
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();