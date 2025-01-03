const Product = require('../Models/products'); // Import model Product

// Hàm hiển thị trang chủ
exports.getHomePage = async (req, res) => {
  try {
    // Lấy sản phẩm sandals và sneakers từ MongoDB
    const sandals = await Product.find({ ID: { $in: ["PROD001", "PROD002", "PROD003", "PROD004", "PROD005"] } });
    const sneakers = await Product.find({ ID: { $in: ["PROD006", "PROD007", "PROD008", "PROD009", "PROD010"] } });

    res.render('home', { sandals, sneakers });
  } catch (error) {
    console.error("Lỗi khi tải trang chủ:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Hàm xử lý tìm kiếm sản phẩm
exports.getSearchResults = async (req, res) => {
  try {
    const query = req.query.q; // Lấy giá trị tìm kiếm từ query string
    
    // Tìm sản phẩm theo tên sản phẩm trong MongoDB
    const sandals = await Product.find({ 
      tensanpham: { $regex: query, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa chữ thường
    });

    res.render('search', { sandals, query });
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    res.status(500).send("Internal Server Error");
  }
};
