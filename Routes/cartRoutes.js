const express = require('express');
const router = express.Router();
const Product = require('../Models/products'); // Import model Product

// Route cho trang giỏ hàng
router.get('/cart/products', async (req, res) => {
    try {
        // Giả sử bạn lưu ID sản phẩm trong giỏ hàng
        const cartProducts = ["PROD001", "PROD002"]; // Thay đổi để lấy ID sản phẩm từ session hoặc database
        const products = await Product.find({ ID: { $in: cartProducts } }); // Lấy sản phẩm từ MongoDB

        res.render('cart', { products }); // Gửi danh sách sản phẩm đến giao diện
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
