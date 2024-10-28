const express = require('express');
const router = express.Router();
const Product = require('../Models/products'); // Import model Product

// Route cho trang home
router.get('/', async (req, res) => {
  try {
    // Lấy sản phẩm sandals và sneakers từ MongoDB
    const sandals = await Product.find({ ID: { $in: ["PROD001", "PROD002", "PROD003", "PROD004", "PROD005"] } });
    const sneakers = await Product.find({ ID: { $in: ["PROD006", "PROD007", "PROD008", "PROD009", "PROD010"] } });

    res.render('home', { sandals, sneakers }); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;


