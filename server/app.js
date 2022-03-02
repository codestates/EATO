const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const socketio = require("socket.io");
const connectDB = require("./config/dbConnect.js");
const PORT = 3000;
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { meetingMemberStatus } = require("./controlllers/function/index");
const controllers = require("./routes/index.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

const server = http.createServer(app);
const io = socketio(server, {
  path: "/socket.io",
  cors: {
    origin: "*",
    credentials: true,
  },
  serveClient: false, // TODO: 클라이언트에서 socket 설치하면 false 로 바꿔주기
});

const main = io.of("/");
const chat = io.of("/chat");

const Chatting = require("./models/chatting");
const Notification = require("./models/notification");
const { currentTime, vaildDocumentId } = require("./controlllers/function");

app.set("main", main);
app.set("chat", chat);

dotenv.config();
connectDB();

server.listen(PORT, () => {
  console.log(`start server ${PORT}`);
  app.set("meetingMember", meetingMemberStatus());
});

// app.use("/build", express.static("build"));
// app.get("/", (req, res) => {
//   res.redirect("/build");
// });

app.use("/user", controllers.user);
app.use("/chat", controllers.chat);
app.use("/document", controllers.document);
app.use("/notification", controllers.notification);

main.on("connection", (socket) => {
  console.log(`메인접속 : ${socket.client.id}`);

  socket.on("leaveMainRoom", (room) => {
    socket.leave(room);
  });

  socket.on("joinMainRoom", (room) => {
    socket.join(room);
  });

  socket.on("signout", () => {
    main.in(socket.id).disconnectSockets();
  });

  socket.on("disconnect", () => {
    console.log("클라이언트 연결 해제", socket.id);
  });
});

chat.on("connection", async (socket) => {
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
    socket.broadcast.to(roomId).emit("disconnectUser", param);
  });

  socket.on("ㅕmessage", (msg) => {
    console.dir(msg);
  });

  socket.on("message", async (userInfo, message) => {
    // 채팅창에 접속중인 유저들에 대한 이벤트
    const { userId, nickname } = await userInfo;
    console.log(nickname, userId, message);
    const date = currentTime();
    const _id = mongoose.Types.ObjectId(); // 채팅로그의 _id + 알림의 _id 동시에 사용
    const documentInfo = await Chatting.typeChat(
      socket.curRoom,
      _id,
      userId,
      message,
      nickname,
      date
    );
    socket
      .to(socket.curRoom)
      .emit("message", { _id, id: userId, message, nickname, date });

    const userList = Object.keys(meetingMember[socket.curRoom]).filter((el) => {
      return meetingMember[socket.curRoom][el] === 0;
    });

    const noticeInfo = {
      id: _id,
      documentId: socket.curRoom,
      type: "new",
      url: `/chat/${socket.curRoom}`,
      target: null,
      title: documentInfo.title,
      message: `새로운 메세지가 도착했습니다.`,
    };

    await Notification.createNotice(userList, noticeInfo); // userList: 유저 아이디가 담긴 배열, noticeInfo: 알림의 정보가 담긴 객체
    // 메인에 notice 알림, new 타입의 경우에 이미 해당 document의 new 타입 메시지가 있을 경우에 notification 목록에 추가 생성되지않음
    // 그래서 클라이언트에서도 이미 new 타입과 documentgId가 같은 알림을 이미 가지고 있다면 스테이트에 추가하면 안됨.!
    main.to(socket.curRoom).emit("notice", noticeInfo);
  });
});
