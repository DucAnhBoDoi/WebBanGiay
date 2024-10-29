// Routes/cart.js
const express = require('express');
const router = express.Router();
const Product = require('../Models/products'); // Import model Product

// Route cho trang giỏ hàng
router.get('/cart/products', async (req, res) => {
    try {
        const cartProducts = ["PROD001", "PROD002"]; 
        const products = await Product.find({ ID: { $in: cartProducts } }); 

        res.render('cart', { products }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
