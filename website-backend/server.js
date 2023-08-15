// // Import the Express library.
// const express = require('express');
// // Initializing the app.
// const app = express();

// // Getting the path request and sending the response with text
// app.get('/', (req, res) => {
//     res.send('Hi, your request has been received');
// });

// // Listen on port 2000
// app.listen(2000, () => {
//     console.log('listening at http://localhost:2000');
// });

// Import mongoose and connect to MongoDB
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

mongoose.connect('mongodb://localhost/brilliantwear');

const productSchema = new Schema({
    brand: String,
    category: String,
    price: Number,
    image_url: String
});

const Product = model('Product', productSchema);


// Prints the last added product/record/document(official) in the colletion named "products"
Product.find().limit(1).sort({$natural:-1}).then(p => console.log(p)).catch(error => console.log(error));

//async function run() {
//	const firstProduct = await Product.findOne({});
//	console.log(firstProduct);
//}
//run();

//mongoose.connection.close();
