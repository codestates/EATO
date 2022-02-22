const mongoose = require("mongoose");
const nodeEnv = process.env.NODE_ENV;
const connect = () => {
  if (nodeEnv !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    `mongodb+srv://klj:${process.env.MONGODB}@cluster0.gskmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      dbName: "EATO",
      useNewUrlParser: true,
    },
    (error) => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
