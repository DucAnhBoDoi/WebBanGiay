const express = require('express');
const router = express.Router();
const Product = require('../Models/products'); 
const Cart = require('../Models/cart'); 
const User = require('../Models/user'); 

// Route cho trang payment
router.get('/payment/products', async (req, res) => {
    try {
        // Lấy giỏ hàng duy nhất từ database (không cần ID giỏ hàng)
        const cart = await Cart.findOne();  // Lấy giỏ hàng đầu tiên hoặc duy nhất

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


router.delete('/payment/place-order', async (req, res) => {
    try {
        // Tìm giỏ hàng
        let cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        // Xóa tất cả sản phẩm trong giỏ
        cart.items = [];

        // Lưu lại giỏ hàng sau khi xóa
        await cart.save();

        // Phản hồi thành công
        res.json({ message: 'Đặt hàng thành công!' });
    } catch (error) {
        console.error('Lỗi khi đặt hàng:', error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi đặt hàng.' });
    }
});


module.exports = router;
