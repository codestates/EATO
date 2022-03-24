const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const socketio = require("socket.io");
const connectDB = require("./config/dbConnect.js");
const PORT = 3000;
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const controllers = require("./routes/index.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

const server = http.createServer(app);
const io = socketio(server, {
  path: "/socket.io",
  cors: {
    origin: true,
    credentials: true,
  },
  serveClient: false, // TODO: 클라이언트에서 socket 설치하면 false 로 바꿔주기
});

const Chatting = require("./models/chatting");
const { currentTime } = require("./controlllers/function");

dotenv.config();
connectDB();

server.listen(PORT, () => {
  console.log(`start server ${PORT}`);
});

app.use("/user", controllers.user);
app.use("/chatRoom", controllers.chat);
app.use("/document", controllers.document);
app.use("/notification", controllers.notification);

io.on("connection", async (socket) => {
  console.log(`채팅 접속 : ${socket.client.id}`);

  let roomId;
  const param = {
    id: socket.client.id,
  };

  socket.on("join", (data) => {
    roomId = data.id;
    socket.leaveAll();
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("connectUser", param);
  });

  socket.on("disconnect", () => {
    console.log("연결해제");
    socket.broadcast.to(roomId).emit("disconnectUser", param);
  });

  socket.on("message", async (userInfo, message) => {
    // 채팅창에 접속중인 유저들에 대한 이벤트
    const { id: userId, nickname } = userInfo;
    const date = currentTime();
    const _id = mongoose.Types.ObjectId(); // 채팅로그의 _id + 알림의 _id 동시에 사용
    await Chatting.typeChat(socket.curRoom, _id, userId, message, date);
    socket
      .to(socket.curRoom)
      .emit("message", { _id, id: userId, message, nickname, date });
  });
});
