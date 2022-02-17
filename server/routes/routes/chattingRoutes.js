const router = require("express").Router();
const {
  chatList,
  enterChat,
} = require("../../controlllers/chattingController");
const { protect } = require("../../middleware/auth");

router.get("/", protect, chatList); // 채팅리스트 조회
router.get("/:chatId", protect, enterChat); // 채팅 입장

module.exports = router;
