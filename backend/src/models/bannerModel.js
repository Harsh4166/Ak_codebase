const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    bannerName: String,
    bannerImage: {
        url: String,
        filepath: String
    },
    // Assuming you store the image filename or path
    // Add more fields as needed
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
