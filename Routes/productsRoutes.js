const express = require('express');
const router = express.Router();
const path = require('path');

// Route cho trang detail
router.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'products.html'));
});

module.exports = router;
