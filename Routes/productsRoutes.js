const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../Controllers/productsController'); 

// Route lấy danh sách tất cả sản phẩm
router.get('/products', getProducts);

// Route lấy chi tiết sản phẩm theo ID
router.get('/products/:id', getProductById);

module.exports = router;
