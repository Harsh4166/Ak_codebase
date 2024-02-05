const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,
  productDescription: String,
  unit: String,
  productImage: {
    url: String,
    filepath: String
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
