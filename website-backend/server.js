// Import the Express library.
const express = require('express');
// Initializing the app.
const app = express();
// Import mongoose
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Getting the path request and sending the response with text
app.get('/', (req, res) => {
    res.send('Hi, your request has been received');
});

app.get('/get-latest-products/:no', (req, res) => {
    const noProducts = req.params.no;
    const latestProducts = getLatestProducts(noProducts);
    res.send(latestProducts);
});

// Listen on port 80
app.listen(80, () => {
    console.log('listening at http://localhost:80');
});

// Connect to MongoDB and the database called brilliantwear 
mongoose.connect('mongodb://localhost/brilliantwear');

const productSchema = new Schema({
    brand: String,
    category: String,
    price: Number,
    image_url: String
});

const Product = model('Product', productSchema);

// Prints the last added document/product in the collection named "products"
// Product.find().limit(1).sort({ $natural: -1 }).then(p => console.log(p)).catch(error => console.log(error));

function getLatestProducts(noProducts) {
    try {
        const products = Product.find().limit(noProducts).sort({ $natural: -1 });
        return products;
    } catch (error) {
        console.error(error);
    }
}

//async function run() {
//	const firstProduct = await Product.findOne({});
//	console.log(firstProduct);
//}
//run();

//mongoose.connection.close();
