const User = require('../Models/user');


const getUser = async (req, res) => {
    try {
        const user = await User.findOne(); 
        if (!user) {
            return res.status(404).send('Người dùng không tồn tại');
        }
        res.json(user); // Trả về dữ liệu người dùng
    } catch (error) {
        res.status(500).send('Lỗi khi lấy dữ liệu người dùng');
    }
};

module.exports = {
    getUser,
};
