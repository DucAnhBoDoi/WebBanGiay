const express = require('express');
const router = express.Router();
const Product = require('../Models/products'); // Import model Product
const User = require('../Models/user'); // Import model User

// Route cho trang payment
router.get('/payment/products', async (req, res) => {
    try {
        // Giả sử bạn lưu ID sản phẩm trong giỏ hàng
        const cartProducts = ["PROD001", "PROD002"]; 
        const products = await Product.find({ ID: { $in: cartProducts } }); // Lấy sản phẩm từ MongoDB

        // Tính tổng giá và số lượng sản phẩm
        const totalQuantity = products.length; // Số lượng sản phẩm
        const shippingFee = 1000; // Phí vận chuyển
        const totalPrice = products.reduce((sum, product) => sum + product.gia, 0) + shippingFee; // Tính tổng giá

        // Lấy thông tin người dùng
        const user = await User.findOne(); 

        // Render trang payment và truyền dữ liệu
        res.render('payment', { products, totalQuantity, shippingFee, totalPrice, user }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
