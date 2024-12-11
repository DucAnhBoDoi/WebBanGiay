const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController'); // Import paymentController

// Route hiển thị trang thanh toán
router.get('/payment/products', paymentController.getPaymentPage);

// Route xử lý đặt hàng
router.delete('/payment/place-order', paymentController.placeOrder);

module.exports = router;
