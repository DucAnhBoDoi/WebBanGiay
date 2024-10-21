const express = require('express');
const router = express.Router();
const path = require('path');

// Route cho trang home
router.get('/cart/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'cart.html'));
});

module.exports = router;
