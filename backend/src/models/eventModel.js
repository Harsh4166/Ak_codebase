const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: String,
    eventDescription: String,
    eventPrice: String,
    eventImage: {
        url: String,
        filepath: String
    },
    // Assuming you store the image filename or path
    // Add more fields as needed
});

const Event = mongoose.model('Events', eventSchema);

module.exports = Event;
