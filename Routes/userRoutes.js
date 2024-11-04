const express = require('express');
const router = express.Router();
const User = require('../Models/user'); // Import model User
const path = require('path');

// Route cho trang thông tin tài khoản
router.get('/account', async (req, res) => {
    try {
        const user = await User.findOne();
        if (!user) {
            return res.status(404).send('Người dùng không tìm thấy');
        }
        res.render('user', { user }); 
    } catch (error) {
        res.status(500).send('Lỗi khi lấy thông tin tài khoản');
    }
});

module.exports = router;
