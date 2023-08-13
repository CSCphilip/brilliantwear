// Import the Express library.
const express = require('express');
// Initializing the app.
const app = express();

// Import mongoose and connect to MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/brilliantwear');

// Getting the path request and sending the response with text
app.get('/', (req, res) => {
    res.send('Hi, your request has been received');
});

// Listen on port 2000
app.listen(2000, () => {
    console.log('listening at http://localhost:2000');
});
