const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const eventBookingController = require('../controllers/eventBookingController');

const eventRoutes = (upload) => {
    // post /api/events/create
    router.post('/create', upload.single('file'), eventController.createEvent);
    // POST /api/events/booking/create
    router.post('/booking/create', upload.single('file'), eventBookingController.createEventBooking);

    // GET /api/events/fetch
    router.get('/fetch', eventController.getAllEvents);
    // GET /api/events/booking/fetch
    router.get('/booking/fetch', eventBookingController.getAllEventBookings);

    // GET /api/events/fetch/:eventId
    router.get('/fetch/:eventId', eventController.getEventById);
    // GET /api/events/booking/fetch/:eventId
    router.get('/booking/fetch/:eventId', eventBookingController.getEventBookingById);

    // delete /api/events/fetch/:eventId
    router.delete('/delete/:eventId', eventController.deleteEvent);

    return router;
};

module.exports = eventRoutes;
