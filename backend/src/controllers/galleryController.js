const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Gallery = require('../models/galleryModel'); // Assuming you have an gallery model
const storageBucket = require('../../config/firebase/firebaseConfig');

const galleryController = {

    createGallery: async (req, res) => {
        try {
            // Validate request
            if (!req.file || req.file.length === 0 || !req.body.galleryName) {
                return res.status(400).json({ error: 'Invalid request data' });
            }

            const { url, filepath } = await processAndUploadImage(req.file, req.body.galleryName);

            const newGallery = new Gallery({
                galleryName: req.body.galleryName,
                galleryCategories: req.body.galleryCategories,
                galleryImage: {
                    url: url,
                    filepath: filepath,
                },
            });

            await newGallery.save();

            res.json(newGallery);
        } catch (error) {
            console.error('Error in createGallery:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllGalleries: async (req, res) => {
        try {
            const galleries = await Gallery.find();
            res.json(galleries);
        } catch (error) {
            console.error('Error in getAllGalleries:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getGalleryById: async (req, res) => {
        try {
            const galleryId = req.params.galleryId;
            const gallery = await Gallery.findById(galleryId);

            if (!gallery) {
                return res.status(404).json({ error: 'Gallery not found' });
            }

            res.json(gallery);
        } catch (error) {
            console.error('Error in getGalleryById:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },



    deleteGallery: async (req, res) => {
        try {
            const galleryId = req.params.galleryId;

            // Fetch the gallery item by ID
            const galleryItem = await Gallery.findById(galleryId);

            if (!galleryItem) {
                return res.status(404).json({ error: 'Gallery item not found' });
            }

            // Remove the gallery item image from Firebase Storage
            const file = storageBucket.file(galleryItem.galleryImage.filepath);
            await file.delete();

            // Delete the gallery item from the database
            await Gallery.findByIdAndDelete(galleryId);

            res.json({ message: 'Gallery deleted successfully' });
        } catch (error) {
            console.error('Error in deleteGallery:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },




};

// ... Other galleryController methods ...

async function processAndUploadImage(file, galleryName) {
    try {

        const { buffer, originalname, mimetype } = file;

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `GalleryImage/${galleryName}-${uniqueSuffix}${path.extname(originalname)}`;
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

module.exports = galleryController;
