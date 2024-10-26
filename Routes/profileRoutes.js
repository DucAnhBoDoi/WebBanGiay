const express = require('express');
const router = express.Router();
const User = require('../Models/user'); // Import model User
const path = require('path');

// Route cho trang thông tin tài khoản
router.get('/account', async (req, res) => {
    try {
        const user = await User.findOne(); // Lấy thông tin người dùng từ database
        if (!user) {
            return res.status(404).send('Người dùng không tìm thấy');
        }
        res.render('profile', { user }); // Render profile.ejs và truyền thông tin người dùng
    } catch (error) {
        res.status(500).send('Lỗi khi lấy thông tin tài khoản');
    }
});

module.exports = router;
