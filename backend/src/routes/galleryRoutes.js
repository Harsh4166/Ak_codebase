const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

const galleryRoutes = (upload) => {
    // GET /api/event/create
    router.post('/create', upload.single('file'), galleryController.createGallery);

    // GET /api/gallery/fetch
    router.get('/fetch', galleryController.getAllGalleries);

    // GET /api/gallery/fetch/:galleryId
    router.get('/fetch/:galleryId', galleryController.getGalleryById);

    // delete /api/gallery/fetch/:galleryId
    router.delete('/delete/:galleryId', galleryController.deleteGallery);

    return router;
};

module.exports = galleryRoutes;
