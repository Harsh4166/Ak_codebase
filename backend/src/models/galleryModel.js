const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    galleryName: String,
    galleryCategories: String,
    galleryImage: {
        url: String,
        filepath: String
    },
    // Assuming you store the image filename or path
    // Add more fields as needed
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
