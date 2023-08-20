const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { Schema, model } = mongoose;

// Initializing the app.
const app = express();

// This enables the frontend of the website to fetch data from this server
app.use(cors({ origin: 'http://localhost:8000' }));

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
        res.json(latestProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/get-image/:url', (req, res) => {
    const imageURL = req.params.url;
    console.log('Getting image from url: ' + imageURL);

    try {
        res.sendFile(__dirname + imageURL);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('listening at http://localhost:3000');
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

async function getLatestProducts(noProducts) {
    try {
        const latestProducts = await Product.find({}, { _id: 0 })
            .limit(noProducts)
            .sort({ _id: -1 })
            .lean() // Documents returned from queries with the lean option enabled are plain javascript objects, not Mongoose Documents.
            .exec();
        return latestProducts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//mongoose.connection.close();
