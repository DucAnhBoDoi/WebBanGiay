const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../Controllers/userController'); 

// Route cho trang thông tin tài khoản
router.get('/account', getUser); 

// Route để cập nhật thông tin người dùng
router.post('/account', updateUser); 

module.exports = router;
