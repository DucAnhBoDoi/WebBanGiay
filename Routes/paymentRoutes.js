const express = require('express');
const router = express.Router();
const Product = require('../Models/products'); // Import model Product
const Cart = require('../Models/cart'); // Import model Cart (thêm Cart model)
const User = require('../Models/user'); // Import model User

// Route cho trang payment
router.get('/payment/products', async (req, res) => {
    try {
        // Giả sử bạn lưu cartId trong session hoặc đã có sẵn trong cơ sở dữ liệu
        const cartId = "674de08ddfe4765675466cbf";  // ID giỏ hàng, có thể lấy từ session

        // Lấy dữ liệu giỏ hàng từ collection Cart
        const cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).send("Giỏ hàng không tìm thấy");
        }

        // Lấy sản phẩm từ giỏ hàng
        const cartItems = cart.items;

        // Tính tổng số lượng và tổng giá của các sản phẩm trong giỏ
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.soluong, 0); // Tính tổng số lượng
        const shippingFee = 1000; // Phí vận chuyển cố định
        const totalPrice = cartItems.reduce((sum, item) => sum + (item.gia * item.soluong), 0) + shippingFee; // Tính tổng giá

        // Lấy thông tin người dùng
        const user = await User.findOne(); 

        // Render trang payment và truyền dữ liệu
        res.render('payment', { products: cartItems, totalQuantity, shippingFee, totalPrice, user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
