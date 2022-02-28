const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbConnect.js");
const https = require("https");
const fs = require("fs");
const controllers = require("./routes/index.js");
const { meetingMemberStatus } = require("./controlllers/socketNotiController");
const SocketIO = require("./socket");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// extended 옵션의 경우, true일 경우, 객체 형태로 전달된 데이터내에서 또다른 중첩된 객체를 허용한다는 말이며, false인 경우에는 허용하지 않는 다는의미이다.
// bodyParser 미들웨어의 여러 옵션 중에 하나로 false 값일 시 node.js에 기본으로 내장된 queryString, true 값일 시 따로 설치가 필요한 npm qs 라이브러리를 사용한다.
// queryString 과 qs 라이브러리 둘 다 url 쿼리 스트링을 파싱해주는 같은 맥락에 있으나 qs가 추가적인 보안이 가능한 말 그대로 extended 확장된 형태이다.
// 기본이 true 값이니 qs 모듈을 설치하지 않는다면 아래와 같이 false 값으로 따로 설정을 해주어야 한다.
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.get("/", (req, res) => {
  res.send("EATO API ON!!");
});

// 라우트 연결
app.use("/user", controllers.user);
app.use("/chat", controllers.chat);
app.use("/document", controllers.document);
app.use("/notification", controllers.notification);

const HTTPS_PORT = process.env.HTTPS_PORT || 3000;

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);

  server.listen(HTTPS_PORT, async () => {
    app.set("meetingMember", await meetingMemberStatus());
    SocketIO(server, app);
    console.log("https server runnning!!");
  });
} else {
  server = app.listen(HTTPS_PORT, () => console.log("http server runnning"));
}

module.exports = server;
