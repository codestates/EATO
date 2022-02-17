const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true,
    });
    console.log("MongoDB Connected success!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // 즉시 종료
  }
};

module.exports = dbConnect;
// 데이터베이스 연결
