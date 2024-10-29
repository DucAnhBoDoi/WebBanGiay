// Controllers/productController.js
const Product = require('../Models/products');

// Lấy danh sách sản phẩm
const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Lấy tất cả sản phẩm
        res.json(products); // Trả về dữ liệu sản phẩm
    } catch (error) {
        res.status(500).send('Lỗi khi lấy dữ liệu sản phẩm');
    }
};

module.exports = {
    getProducts,
};
