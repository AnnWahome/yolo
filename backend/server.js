//Connection to the database linked to app-ip-mongo running at port 27017 which is created as an image in my yaml file.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// Connecting to the Database
const mongodb_url = 'mongodb://app-ip-mongo:27017/';
const dbName = 'yolomy';

// Define a URL to connect to the database
const MONGODB_URI = process.env.MONGODB_URI || `${mongodb_url}${dbName}`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;

// Check Connection
db.once('open', () => {
    console.log('Database connected successfully');
});

// Check for DB Errors
db.on('error', (error) => {
    console.error('Database connection error:', error);
});

// Initializing express
const app = express();

// Body parser middleware
app.use(express.json());

// Handle multipart/form-data
app.use(upload.array());

// Enable CORS
app.use(cors());

// Use Route
app.use('/api/products', productRoute);

// Define the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
