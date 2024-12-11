// Controllers/productController.js
const Product = require('../Models/products');

// Lấy danh sách tất cả sản phẩm
const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Lấy tất cả sản phẩm
        res.json(products); // Trả về dữ liệu sản phẩm dạng JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy danh sách sản phẩm');
    }
};

// Lấy thông tin chi tiết một sản phẩm
const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findOne({ ID: productId });

        if (!product) {
            return res.status(404).send('Sản phẩm không tồn tại');
        }

        // Tìm các sản phẩm gợi ý
        const suggestedProducts = await Product.find({ ID: { $ne: productId } }).limit(5);

        // Render trang chi tiết sản phẩm
        res.render('products', { product, suggestedProducts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi khi lấy thông tin sản phẩm');
    }
};

module.exports = {
    getProducts,
    getProductById,
};
