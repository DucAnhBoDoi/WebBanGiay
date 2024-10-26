const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ID: { type: String, required: true },
    hoten: { type: String, required: true },
    sodienthoai: { type: String, required: true },
    diachi: { type: String, required: true },
    thanhpho: { type: String, required: true },
    phuong: { type: String, required: true },
    quan: { type: String, required: true }
}, { collection: 'User' });

const User = mongoose.model('User', userSchema);

module.exports = User;
