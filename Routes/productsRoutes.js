const express = require('express');
const router = express.Router();
const Product = require('../Models/products'); // Import model Product

// Route cho trang chi tiết sản phẩm
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findOne({ ID: productId }); // Lấy sản phẩm theo ID
    const suggestedProducts = await Product.find({ ID: { $ne: productId } }).limit(5); // Lấy 5 sản phẩm khác

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('products', { product, suggestedProducts }); // Truyền sản phẩm và sản phẩm gợi ý vào view
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
