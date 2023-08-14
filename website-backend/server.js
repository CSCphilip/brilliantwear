// Import the Express library.
const express = require('express');
// Initializing the app.
const app = express();

// Getting the path request and sending the response with text
app.get('/', (req, res) => {
    res.send('Hi, your request has been received');
});

// Listen on port 2000
app.listen(2000, () => {
    console.log('listening at http://localhost:2000');
});

// Import mongoose and connect to MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/brilliantwear');

const { Schema, model } = mongoose;

const productSchema = new Schema({
    brand: String,
    category: String,
    price: Number,
    image_url: String
});

var Product = mongoose.model("Product", productSchema);

const firstProduct = await Product.findOne({});
console.log(firstProduct);