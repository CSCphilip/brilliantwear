const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
// const multer = require('multer');
// const bodyParser = require('body-parser');

const { Schema, model } = mongoose;

// Initializing the app.
const app = express();

// Listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log('listening at http://localhost:3000');
});

// const upload = multer();

// This enables the frontend of the website to fetch data from this server
app.use(cors({ origin: ['http://localhost:8000'] }));

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

// // for parsing application/json
// app.use(bodyParser.json());
// // for parsing application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
// // for parsing multipart/form-data
// app.use(upload.array());
//app.use(express.static(__dirname));
app.post('/upload-product',
    fileUpload(),
    (req, res) => {
        console.log("A POST request to /upload-product was made");
        const files = req.files;
        const body = req.body;

        const imagePath = path.join(__dirname, 'images', files['image'].name);

        files['image'].mv(imagePath,
            (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            });

        addProduct(body, files['image'].name);

        // In this case, the client's browser will automatically follow the
        // Location header, resulting in a GET request to the specified URL.
        // This approach is in line with HTTP standards and provides a clear 
        // way to indicate both successful form submission and redirection.
        res.status(303)
            .set('Location', 'http://localhost:8000/product-uploaded')
            .send();
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

async function addProduct(body, imageName) {
    try {
        const newProduct = new Product(body);
        newProduct['image_url'] = path.join('/images', imageName);
        console.log("Created the following new product: " + newProduct);

        await newProduct.save();
        console.log("New product added to the MongoDB successfully");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// mongoose.connection.close();
