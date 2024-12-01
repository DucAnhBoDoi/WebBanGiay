// Controllers/cartController.js
const Cart = require('../Models/cart'); // Import model Cart
const Product = require('../Models/products'); // Import model Product

// Hàm thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
    try {
        const { productId, size, quantity } = req.body;

        // Tìm sản phẩm theo ID
        const product = await Product.findOne({ ID: productId });
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Tạo đối tượng sản phẩm
        const cartItem = {
            tensanpham: product.tensanpham,
            ID: product.ID,
            hinhanh: product.hinhanh,
            gia: product.gia,
            kichthuoc: parseInt(size), // Lưu kích thước là số
            soluong: parseInt(quantity)
        };

        // Tìm giỏ hàng
        let cart = await Cart.findOne();
        if (!cart) {
            // Nếu chưa có giỏ hàng, tạo mới
            cart = new Cart({
                items: [cartItem]
            });
        } else {
            // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng
            const existingItem = cart.items.find(
                item => item.ID === productId && item.kichthuoc === cartItem.kichthuoc
            );

            if (existingItem) {
                // Cộng dồn số lượng
                existingItem.soluong += cartItem.soluong;
            } else {
                // Thêm mới nếu chưa tồn tại
                cart.items.push(cartItem);
            }
        }

        // Lưu giỏ hàng
        await cart.save();
        res.json({ message: 'Sản phẩm đã được thêm vào giỏ hàng!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi thêm vào giỏ hàng' });
    }
};






