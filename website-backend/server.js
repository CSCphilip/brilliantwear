// Import the Express library.
const express = require('express');
// Initializing the app.
const app = express();
// Import mongoose
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Getting the path request and sending the response with text
app.get('/', (req, res) => {
    console.log('Someone accessed "/"');
    res.send('Hi, your request has been received!');
});

app.get('/get-latest-products/:no', async (req, res) => {
    console.log('Getting latest products from the MongoDB');
    const noProducts = req.params.no;

    try {
        const latestProducts = await getLatestProducts(noProducts);
        console.log(latestProducts);
        res.json(latestProducts); // Sending the JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
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

async function getLatestProducts(noProducts) {
    try {
        const latestProducts = await Product.find({}, { _id: 0 })
            .limit(noProducts)
            .sort({ _id: -1 })
            .exec();
        return latestProducts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//async function run() {
//	const firstProduct = await Product.findOne({});
//	console.log(firstProduct);
//}
//run();

//mongoose.connection.close();
