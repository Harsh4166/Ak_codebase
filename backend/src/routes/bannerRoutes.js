const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');

const bannerRoutes = (upload) => {
    // GET /api/banner/create
    router.post('/create', upload.single('file'), bannerController.createBanner);

    // GET /api/banner/fetch
    router.get('/fetch', bannerController.getAllBanners);

    // GET /api/banner/fetch/:bannerId
    router.get('/fetch/:bannerId', bannerController.getBannerById);

    // GET /api/banner/delete/:bannerId
    router.delete('/delete/:bannerId', bannerController.deleteBanner);





    return router;
};

module.exports = bannerRoutes;
