// Models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    tensanpham: { type: String, required: true },
    ID: { type: String, required: true },
    hinhanh: { type: String, required: true },
    gia: { type: Number, required: true },
    kichthuoc: { type: [Number], required: true },
    soluong: { type: Number, required: true }
}, { collection: 'Products' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


