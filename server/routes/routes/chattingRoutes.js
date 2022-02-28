const router = require("express").Router();
const {
  chatList,
  enterChat,
} = require("../../controlllers/chattingController");

const { protect } = require("../../middleware/index");

router.get("/", chatList); // 채팅리스트 조회
router.get("/:gatheringId", protect, enterChat); // 채팅 입장

module.exports = router;
