// eventBookingController.js

const Event = require('../models/eventBookingModel');

const eventBookingController = {
    createEventBooking: async (req, res) => {
        try {
            // Extract data from the request body
            const eventData = req.body;

            // Create a new event booking
            const newEvent = await Event.create(eventData);

            res.status(201).json(newEvent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllEventBookings: async (req, res) => {
        try {
            // Retrieve all event bookings
            const events = await Event.find();

            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getEventBookingById: async (req, res) => {
        try {
            // Extract event ID from the request parameters
            const eventId = req.params.eventId;

            // Retrieve a specific event by ID
            const event = await Event.findById(eventId);

            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            res.status(200).json(event);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteEventBooking: async (req, res) => {
        try {
            // Extract event ID from the request parameters
            const eventId = req.params.eventId;

            // Delete a specific event by ID
            const deletedEvent = await Event.findByIdAndDelete(eventId);

            if (!deletedEvent) {
                return res.status(404).json({ error: 'Event not found' });
            }

            res.status(200).json(deletedEvent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = eventBookingController;
