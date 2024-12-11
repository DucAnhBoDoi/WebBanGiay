// Controllers/cartController.js
const Cart = require('../Models/cart');
const Product = require('../Models/products');

// Lấy danh sách sản phẩm trong giỏ hàng
const getCartProducts = async (req, res) => {
    try {
        const cart = await Cart.findOne();
        const cartProducts = cart ? cart.items : [];

        // Lấy thông tin size từ collection Products
        const updatedCartProducts = await Promise.all(cartProducts.map(async (item) => {
            const product = await Product.findOne({ ID: item.ID });
            return {
                ...item.toObject(),
                availableSizes: product ? product.kichthuoc : []
            };
        }));

        res.render('cart', { 
            products: updatedCartProducts, 
            totalItems: cartProducts.length 
        });
    } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
        res.status(500).send("Lỗi khi tải giỏ hàng");
    }
};

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
    try {
        const { productId, size, quantity } = req.body;
        const product = await Product.findOne({ ID: productId });

        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        const cartItem = {
            tensanpham: product.tensanpham,
            ID: product.ID,
            hinhanh: product.hinhanh,
            gia: product.gia,
            kichthuoc: size,
            soluong: parseInt(quantity)
        };

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [cartItem] });
        } else {
            const existingItem = cart.items.find(
                item => item.ID === productId && item.kichthuoc === size
            );
            if (existingItem) {
                existingItem.soluong += parseInt(quantity);
            } else {
                cart.items.push(cartItem);
            }
        }

        await cart.save();
        res.json({ message: 'Sản phẩm đã được thêm vào giỏ!' });
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ:", error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi thêm vào giỏ hàng' });
    }
};

// Xóa một sản phẩm khỏi giỏ hàng
const removeItemFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const cart = await Cart.findOne();

        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();
        res.json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng!' });
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi xóa sản phẩm' });
    }
};

// Xóa tất cả sản phẩm trong giỏ hàng
const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        cart.items = [];
        await cart.save();
        res.json({ message: 'Tất cả sản phẩm đã được xóa khỏi giỏ hàng!' });
    } catch (error) {
        console.error("Lỗi khi xóa tất cả sản phẩm:", error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi xóa tất cả sản phẩm' });
    }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateCartItem = async (req, res) => {
    try {
        const { itemId, quantity, size } = req.body;
        const cart = await Cart.findOne();

        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
        }

        item.soluong = parseInt(quantity);
        item.kichthuoc = size;
        await cart.save();

        const totalPrice = cart.items.reduce((total, item) => total + item.gia * item.soluong, 0);
        res.json({
            message: 'Cập nhật sản phẩm thành công!',
            totalPrice: totalPrice
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi cập nhật sản phẩm' });
    }
};

module.exports = {
    getCartProducts,
    addToCart,
    removeItemFromCart,
    clearCart,
    updateCartItem
};







