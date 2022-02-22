const {
  createDocument,
  deletePost,
  updatePost,
  viewPost,
} = require("../../controlllers/documentController");
const { protect } = require("../../middleware");

const router = require("express").Router();

router.get("/mypost", protect, viewPost); //내 게시물 조회
router.post("/", protect, createDocument); //게시물 생성
router.delete("/:postId", protect, deletePost); //게시물 삭제
router.patch("/:postId", protect, updatePost); //게시물 수정
router.get("/:postId", viewPost); //다른 사람 게시물 조회

module.exports = router;
