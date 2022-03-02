const {
  createDocument,
  deletePost,
  updatePost,
  viewPost,
  showPost,
} = require("../../controlllers/documentController");
const {
  joinParty,
  leaveParty,
} = require("../../controlllers/socketNotiController");
const { protect } = require("../../middleware");

const router = require("express").Router();

router.get("/mypost", protect, viewPost); //내 게시물 조회
router.post("/", protect, createDocument); //게시물 생성
router.get("/", showPost); //전체 게시물 조회
router.delete("/mypost/:documentId", protect, deletePost); //게시물 삭제
router.patch("/:documentId", protect, updatePost); //게시물 수정
router.get("/:documentId", protect, viewPost); //다른 사람 게시물 조회
router.get("/:documentId", protect, joinParty); //파티 참여(다른유저에게 알림보내기)
router.delete("/:documentId", protect, leaveParty); //파티 떠나기(다른유저에게 알림보내기)
module.exports = router;
