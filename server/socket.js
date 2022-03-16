const SocketIO = require("socket.io");
const cookie = require("cookie");
const { verifyToken } = require("./support/token");
const mongoose = require("mongoose");
const Chatting = require("./models/chatting");
const Notification = require("./models/notification");
const meetingMemberStatus = require("./controlllers/function/index");
const {
  currentTime,
  vaildDocumentId,
} = require("./controlllers/socketNotiController");

module.exports = (server, app) => {
  const meetingMember = app.get("meetingMember");
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*",
      credentials: true,
    },
    allowEIO3: true,
    serveClient: false, // TODO: 클라이언git x트에서 socket 설치하면 false 로 바꿔주기
  });
  const main = io.of("/");
  const chat = io.of("/chat");

  app.set("main", main);
  app.set("chat", chat);
  app.set("meetingMember", await meetingMemberStatus());

  main.use(async (socket, next) => {
    const { jwt } = cookie.parse(socket.handshake.headers.cookie || "");
    if (!jwt) {
      return next(new Error("Authentication error"));
    }
    const decoded = await verifyToken(jwt);
    if (!decoded) {
      return next(new Error("Authentication error"));
    }
    // 로그인 후 소켓 연결 시 소켓 객체에 유저 아이디를 저장
    socket.userId = decoded.id;
    // 유저 아이디로부터 참여중인 파티(done=0) 아이디들을 전부 불러온 후 전부 룸으로 참여시킴.
    const roomIds = await vaildDocumentId(decoded.id);
    socket.join(roomIds);
    next();
  });

  chat.use(async (socket, next) => {
    const { jwt } = cookie.parse(socket.handshake.headers.cookie || "");
    if (!jwt) {
      return next(new Error("Authentication error"));
    }
    const decoded = await verifyToken(jwt);
    if (!decoded) {
      return next(new Error("Authentication error"));
    }
    socket.userId = decoded.id;
    // 채팅방에 입장시에 소켓에 유저 아이디를 저장
    const room = Number(socket.handshake.query.room);
    // 소켓을 해당 입장하려는 룸에 입장시킴
    // 유저 관리 객체에 해당 유저 상태를 1로 변경
    try {
      meetingMember[room][decoded.id] = 1;
    } catch (err) {
      return next(err);
    }
    socket.join(room);
    socket.curRoom = room;
    next();
  });

  main.on("connection", (socket) => {
    console.log("클라이언트 연결 성공", socket.id);

    /* Client TODO: 채팅방에 입장, 나갈 때  클라이언트에서 메인 네임스페이스에서 해당 이벤트를 발생시켜줘야 함!
      chat 네임스페이스에서는 메인 소켓을 모름! */
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
    console.log(
      ` /chat room: ${socket.curRoom} 새로운 클라이언트 접속`,
      socket.id
    );
    // Client TODO: 메시지 보낼 때 emit("message", userInfo:{id, nickname,image}, message)

    socket.on("message", async (userInfo, message) => {
      // 채팅창에 접속중인 유저들에 대한 이벤트
      const { id: userId, nickname, image } = userInfo;
      const date = currentTime();
      const _id = mongoose.Types.ObjectId(); // 채팅로그의 _id + 알림의 _id 동시에 사용
      const documentInfo = await Chatting.typeChat(
        socket.curRoom,
        _id,
        userId,
        message,
        date
      );
      chat
        .to(socket.curRoom)
        .emit("message", { _id, id: userId, message, nickname, image, date });

      // 채팅창 밖의 유저들에 대한 이벤트
      // 유저 알림 스키마에서 _id 필드는 삭제하고 대신 key 필드로 고유값이 들어감.
      const userList = Object.keys(meetingMember[socket.curRoom]).filter(
        (el) => {
          return meetingMember[socket.curRoom][el] === 0;
        }
      );

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

    socket.on("leave", () => {
      chat.in(socket.id).disconnectSockets();
    });

    socket.on("disconnect", () => {
      console.log(
        ` /chat room: ${socket.curRoom} 클라이언트 연결 해제`,
        socket.id
      );
      meetingMember[socket.curRoom][socket.userId] = 0;
    });
  });
};
