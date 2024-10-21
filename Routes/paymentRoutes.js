const express = require('express');
const router = express.Router();
const path = require('path');

// Route cho trang payment
router.get('/payment/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'payment.html'));
});

module.exports = router;