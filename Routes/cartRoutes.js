// Routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../Models/products'); // Import model Product
const Cart = require('../Models/cart'); // Import model Cart

// Route cho trang giỏ hàng
router.get('/cart/products', async (req, res) => {
    try {
        const cart = await Cart.findOne(); // Giả sử bạn chỉ có một giỏ hàng duy nhất
        const cartProducts = cart ? cart.items : []; // Lấy tất cả sản phẩm trong giỏ hàng

        // Render trang giỏ hàng với dữ liệu sản phẩm
        res.render('cart', { products: cartProducts });
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi tải giỏ hàng");
    }
});

// Route xử lý thêm sản phẩm vào giỏ hàng
router.post('/add-to-cart', async (req, res) => {
    try {
        const { productId, size, quantity } = req.body;

        // Tìm sản phẩm theo ID
        const product = await Product.findOne({ ID: productId });

        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Tạo đối tượng sản phẩm để thêm vào giỏ
        const cartItem = {
            tensanpham: product.tensanpham,
            ID: product.ID,
            hinhanh: product.hinhanh,
            gia: product.gia,
            kichthuoc: size,  // Lưu kích thước đã chọn
            soluong: parseInt(quantity) // Chuyển số lượng thành số nguyên
        };

        // Tìm giỏ hàng trong database
        let cart = await Cart.findOne();

        if (!cart) {
            // Nếu giỏ hàng chưa tồn tại, tạo mới
            cart = new Cart({
                items: [cartItem]
            });
        } else {
            // Nếu giỏ hàng đã tồn tại, thêm sản phẩm vào giỏ
            const existingItem = cart.items.find(item => item.ID === productId && item.kichthuoc === size);
            if (existingItem) {
                existingItem.soluong += parseInt(quantity); // Cộng thêm số lượng vào
            } else {
                cart.items.push(cartItem); // Thêm sản phẩm mới vào giỏ
            }
        }

        // Lưu giỏ hàng
        await cart.save();

        res.json({ message: 'Sản phẩm đã được thêm vào giỏ!' });
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ:", error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi thêm vào giỏ hàng' });
    }
});

module.exports = router;


