// Example Mongoose Schema
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    //
    eventId: String,
    eventName: String,
    eventPrice: String,
    address: String,
    startDate: Date,
    endDate: Date,
    decorationIdea: String,
    // 
    paymentMethod: String,
    upiID: String,
    cardPaymentId: String,
    advancePayment: Number,
    totalPayment: Number,
    remainingPayment: Number,



});

const EventBooking = mongoose.model('EventBooking', bookingSchema);

module.exports = EventBooking;
