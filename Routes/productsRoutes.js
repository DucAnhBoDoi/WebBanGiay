const express = require('express');
const router = express.Router();
const Product = require('../Models/products'); // Import model Product
const Cart = require('../Models/cart'); // Giả sử bạn có model Cart để lấy giỏ hàng

// Route cho trang chi tiết sản phẩm
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    // Tìm sản phẩm theo ID
    const product = await Product.findOne({ ID: productId });

    // Tìm các sản phẩm gợi ý
    const suggestedProducts = await Product.find({ ID: { $ne: productId } }).limit(5);

    // Lấy thông tin giỏ hàng (giả sử bạn lưu giỏ hàng trong collection 'Cart')
    const cart = await Cart.findOne(); // Giả sử chỉ có một giỏ hàng duy nhất
    const totalItems = cart ? cart.items.length : 0; // Tính tổng số sản phẩm trong giỏ hàng

    // Nếu sản phẩm không tồn tại
    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Render trang chi tiết sản phẩm và truyền số lượng sản phẩm trong giỏ hàng
    res.render('products', { product, suggestedProducts, totalItems });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
