const express = require('express');
const cors = require('cors');
const multer = require('multer');

const { dotenvConfig, dbConnect } = require('./config');
const app = express();
// Load environment variables from .env
dotenvConfig;
// Connect to MongoDB using the URI from .env
dbConnect();

app.use(cors());
app.use(express.json());

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// admin side
// Use the productRoutes for the '/api/product' endpoint
const productRoutes = require('./src/routes/productRoutes');
app.use('/api/product', productRoutes(upload));

// Use the eventRoutes for the '/api/event' endpoint
const eventRoutes = require('./src/routes/eventRoutes');
app.use('/api/events', eventRoutes(upload));

// Use the galleryRoutes for the '/api/gallery' endpoint
const galleryRoutes = require('./src/routes/galleryRoutes');
app.use('/api/gallery', galleryRoutes(upload));

// Use the bannerRoutes for the '/api/banner' endpoint
const bannerRoutes = require('./src/routes/bannerRoutes');
app.use('/api/banner', bannerRoutes(upload));

// client routes
// Use the bannerRoutes for the '/api/user' endpoint
const userRoutes = require('./src/routes/userRoutes');
app.use('/api/user', userRoutes());
app.use('/api/admin', userRoutes());
app.use('/api/employee', userRoutes());




// 

module.exports = app;
