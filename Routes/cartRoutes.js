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

        // Tính số sản phẩm khác nhau trong giỏ hàng
        const totalItems = cartProducts.length;

        // Render trang giỏ hàng với dữ liệu sản phẩm và tổng số sản phẩm
        res.render('cart', { products: cartProducts, totalItems: totalItems });
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

// Route xử lý xóa sản phẩm
router.post('/cart/remove-item', async (req, res) => {
    try {
        const { productId, size, itemId } = req.body;  // Nhận thêm itemId từ body

        // Tìm giỏ hàng
        let cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        // Lọc bỏ sản phẩm muốn xóa theo _id của item
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

        // Lưu giỏ hàng sau khi xóa
        await cart.save();
        res.json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng!' });
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi xóa sản phẩm' });
    }
});


//Route xử lý xóa tất sản phẩm 
router.post('/cart/remove-all', async (req, res) => {
    try {
        // Tìm giỏ hàng
        let cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        // Xóa tất cả sản phẩm trong giỏ
        cart.items = [];

        // Lưu giỏ hàng sau khi xóa
        await cart.save();
        res.json({ message: 'Tất cả sản phẩm đã được xóa khỏi giỏ hàng!' });
    } catch (error) {
        console.error("Lỗi khi xóa tất cả sản phẩm:", error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi xóa tất cả sản phẩm' });
    }
});

// Route xử lý cập nhật số lượng sản phẩm trong giỏ hàng
router.post('/cart/update-item', async (req, res) => {
    try {
        const { itemId, quantity } = req.body;  // Lấy thông tin itemId và quantity từ body

        // Tìm giỏ hàng
        let cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        // Tìm sản phẩm trong giỏ hàng theo itemId
        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
        }

        // Cập nhật số lượng sản phẩm
        item.soluong = parseInt(quantity);

        // Lưu giỏ hàng sau khi cập nhật
        await cart.save();

        // Tính lại tổng giá
        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.gia * item.soluong;
        });

        res.json({
            message: 'Cập nhật số lượng thành công!',
            totalPrice: totalPrice,
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi cập nhật số lượng' });
    }
});

module.exports = router;


