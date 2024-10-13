const express = require('express');
const router = express.Router();
const path = require('path');

// Route cho trang home
router.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'profile.html'));
});

module.exports = router;