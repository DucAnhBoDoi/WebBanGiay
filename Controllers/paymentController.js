const Cart = require('../Models/cart'); // Import model Cart
const User = require('../Models/user'); // Import model User

// Hàm hiển thị trang thanh toán
exports.getPaymentPage = async (req, res) => {
    try {
        const cart = await Cart.findOne(); // Lấy giỏ hàng đầu tiên hoặc duy nhất
        if (!cart) {
            return res.status(404).send("Giỏ hàng không tìm thấy");
        }

        const cartItems = cart.items;
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.soluong, 0); // Tính tổng số lượng
        const shippingFee = 1000; // Phí vận chuyển cố định
        const totalPrice = cartItems.reduce((sum, item) => sum + (item.gia * item.soluong), 0) + shippingFee; // Tính tổng giá

        const user = await User.findOne(); // Lấy thông tin người dùng

        res.render('payment', { 
            products: cartItems, 
            totalQuantity, 
            shippingFee, 
            totalPrice, 
            user 
        });
    } catch (error) {
        console.error("Lỗi khi hiển thị trang thanh toán:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Hàm xử lý đặt hàng
exports.placeOrder = async (req, res) => {
    try {
        let cart = await Cart.findOne(); // Tìm giỏ hàng
        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        cart.items = []; // Xóa tất cả sản phẩm trong giỏ hàng
        await cart.save(); // Lưu lại giỏ hàng sau khi xóa

        res.json({ message: 'Đặt hàng thành công!' }); // Phản hồi thành công
    } catch (error) {
        console.error("Lỗi khi đặt hàng:", error);
        res.status(500).json({ message: 'Đã có lỗi xảy ra khi đặt hàng.' });
    }
};
