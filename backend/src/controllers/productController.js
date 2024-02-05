const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/productModel');
const storageBucket = require('../../config/firebase/firebaseConfig');

const productController = {
    // ... other methods ...

    createProduct: async (req, res) => {
        try {
            // Validate request
            if (!req.file || req.file.length === 0 || !req.body.productName) {
                return res.status(400).json({ error: 'Invalid request data' });
            }

            const { url, filepath } = await processAndUploadImage(req.file, req.body.productName);

            const newProduct = new Product({
                productName: req.body.productName,
                productPrice: req.body.productPrice,
                productDescription: req.body.productDescription,
                unit: req.body.unit,
                productImage: {
                    url: url,
                    filepath: filepath,
                },
            });

            await newProduct.save();

            res.json(newProduct);
        } catch (error) {
            console.error('Error in createProduct:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // ... Get product all ...

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            console.error('Error in getAllProducts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // ... Get product by id ...

    getProductById: async (req, res) => {
        try {
            const productId = req.params.productId;
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json(product);
        } catch (error) {
            console.error('Error in getProductById:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.productId;

            // Fetch the product by ID
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // Remove the banner image from Firebase Storage
            const file = storageBucket.file(product.productImage.filepath);
            await file.delete();

            // Delete the product from the database
            await Product.findByIdAndDelete(productId);

            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error in deleteProduct:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },



};
async function processAndUploadImage(file, productName) {
    try {

        const { buffer, originalname, mimetype } = file;

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `ProductImages/${productName}-${uniqueSuffix}${path.extname(originalname)}`;
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


module.exports = productController;
