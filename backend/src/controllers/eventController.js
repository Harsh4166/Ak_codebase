const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Event = require('../models/eventModel'); // Assuming you have an event model
const storageBucket = require('../../config/firebase/firebaseConfig');

const eventController = {

    createEvent: async (req, res) => {
        try {
            // Validate request
            if (!req.file || req.file.length === 0 || !req.body.eventName) {
                return res.status(400).json({ error: 'Invalid request data' });
            }

            const { url, filepath } = await processAndUploadImage(req.file, req.body.eventName);

            const newEvent = new Event({
                eventName: req.body.eventName,
                eventDescription: req.body.eventDescription,
                eventPrice: req.body.eventPrice,
                eventImage: {
                    url: url,
                    filepath: filepath,
                },
            });

            await newEvent.save();

            res.json(newEvent);
        } catch (error) {
            console.error('Error in createEvent:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllEvents: async (req, res) => {
        try {
            const events = await Event.find();
            res.json(events);
        } catch (error) {
            console.error('Error in getAllEvents:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getEventById: async (req, res) => {
        try {
            const eventId = req.params.eventId;
            const event = await Event.findById(eventId);

            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            res.json(event);
        } catch (error) {
            console.error('Error in getEventById:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const eventId = req.params.eventId;
            const event = await Event.findById(eventId);

            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            // Remove event-related images from Firebase Storage
            const file = storageBucket.file(event.eventImage.filepath);
            await file.delete();

            // Delete the event from the database
            await Event.findByIdAndDelete(eventId);

            res.json({ message: 'Event deleted successfully' });
        } catch (error) {
            console.error('Error in deleteEvent:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

};

// ... Other eventController methods ...

async function processAndUploadImage(file, eventName) {
    try {

        const { buffer, originalname, mimetype } = file;

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `EventImage/${eventName}-${uniqueSuffix}${path.extname(originalname)}`;
        const fileUpload = storageBucket.file(filename);
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: mimetype,
            },
        });

        stream.end(buffer);

        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media&token=${uniqueSuffix}`;

        return {
            url: imageUrl,
            filepath: filename, // Modify this line to include the full filepath
        };
    } catch (error) {
        console.error('Error in processAndUploadImage:', error);
        throw error; // Propagate the error to the calling function
    }
}

module.exports = eventController;
