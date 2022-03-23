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

// 내 게시물 조회 => creatorId로 변경
router.get("/mypost/:creatorId", viewPost); //내 게시물 조회
router.post("/", createDocument); //게시물 생성
router.get("/", showPost); //전체 게시물 조회
router.delete("/mypost/:documentId", deletePost); //게시물 삭제
router.patch("/:documentId", updatePost); //게시물 수정
router.get("/:documentId", viewPost); //다른 사람 게시물 조회
router.get("/:documentId", joinParty); //파티 참여(다른유저에게 알림보내기)
router.delete("/:documentId", leaveParty); //파티 떠나기(다른유저에게 알림보내기)
module.exports = router;
