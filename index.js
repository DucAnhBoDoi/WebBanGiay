const express = require('express')
const path = require('path');
const connectDB = require('./Config/db');

const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

app.use(express.static(path.join(__dirname, 'Public')));

// Kết nối đến MongoDB
connectDB();

// Import routes
const homeRoutes = require('./Routes/homeRoutes');
const productsRoutes = require('./Routes/productsRoutes');
const profileRoutes = require('./Routes/profileRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const cartRoutes = require('./Routes/cartRoutes');

app.use('/', homeRoutes);
app.use('/', productsRoutes);
app.use('/', profileRoutes);
app.use('/', paymentRoutes);
app.use('/', cartRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})