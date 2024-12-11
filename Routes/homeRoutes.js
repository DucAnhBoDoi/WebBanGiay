const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/homeController'); // Import homeController

// Route cho trang chủ
router.get('/', homeController.getHomePage);

// Route cho trang tìm kiếm sản phẩm
router.get('/search', homeController.getSearchResults);

module.exports = router;
