const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/Web_BanGiay';

const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;
