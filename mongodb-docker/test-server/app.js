const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5001;

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/test-server-db', { auth: { username:'philip', password:'<password>' }, authSource:"admin" })
.then(() => {
  console.log('Connected to MongoDB in Docker');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, Dockerized MongoDB!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

