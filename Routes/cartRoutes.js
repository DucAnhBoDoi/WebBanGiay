// Routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const {
    getCartProducts,
    addToCart,
    removeItemFromCart,
    clearCart,
    updateCartItem
} = require('../Controllers/cartController');

// Lấy danh sách sản phẩm trong giỏ hàng
router.get('/cart/products', getCartProducts);

// Thêm sản phẩm vào giỏ hàng
router.post('/add-to-cart', addToCart);

// Xóa một sản phẩm khỏi giỏ hàng
router.delete('/cart/remove-item', removeItemFromCart);

// Xóa tất cả sản phẩm khỏi giỏ hàng
router.delete('/cart/remove-all', clearCart);

// Cập nhật sản phẩm trong giỏ hàng
router.put('/cart/update-item', updateCartItem);

module.exports = router;



