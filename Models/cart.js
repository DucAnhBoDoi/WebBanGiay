// Models/cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [
        {
            tensanpham: { type: String, required: true },
            ID: { type: String, required: true },
            hinhanh: { type: String, required: true },
            gia: { type: Number, required: true },
            kichthuoc: { type: [Number], required: true },
            soluong: { type: Number, required: true },
        }
    ]
}, { collection: 'Cart' });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
