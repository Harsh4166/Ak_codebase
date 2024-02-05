const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const productRoutes = (upload) => {
    // GET /api/product/create
    router.post('/create', upload.single('file'), productController.createProduct);

    // GET /api/products/fetch
    router.get('/fetch', productController.getAllProducts);

    // GET /api/products/fetch/:productId
    router.get('/fetch/:productId', productController.getProductById);

    // GET /api/products/delete/:productId
    router.delete('/delete/:productId', productController.deleteProduct); // New delete route

    return router;
};

module.exports = productRoutes;
