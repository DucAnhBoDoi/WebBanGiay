const User = require('../Models/user');

// Lấy thông tin người dùng
const getUser = async (req, res) => {
    try {
        const user = await User.findOne(); 
        if (!user) {
            return res.status(404).send('Người dùng không tồn tại');
        }
        const successMessage = req.query.success ? 'Thay đổi thông tin tài khoản thành công!' : null; 
        const errorMessage = req.query.error ? req.query.error : null; 
        res.render('user', { user, successMessage, errorMessage }); 
    } catch (error) {
        res.status(500).send('Lỗi khi lấy dữ liệu người dùng');
    }
};

// cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    const { username, phone, address, city, ward, district } = req.body;

    const nameRegex = /^[^\d]*$/;
    const phoneRegex = /^[0-9]*$/;

    if (!nameRegex.test(username)) {
        return res.json({ message: 'Họ tên không được chứa chữ số.' });
    }
    if (!phoneRegex.test(phone)) {
        return res.json({ message: 'Số điện thoại không được chứa kí tự.' });
    }

    try {
        const user = await User.findOne();
        if (!user) {
            return res.status(404).send('Người dùng không tìm thấy');
        }

        user.hoten = username;
        user.sodienthoai = phone;
        user.diachi = address;
        user.thanhpho = city;
        user.phuong = ward;
        user.quan = district;

        await user.save();
        return res.json({ message: 'Thay đổi thông tin tài khoản thành công!' });
    } catch (error) {
        return res.json({ message: 'Lỗi khi cập nhật thông tin người dùng' });
    }
};


module.exports = {
    getUser,
    updateUser,
};
