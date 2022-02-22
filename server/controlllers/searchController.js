// const Document = require('../models/document')
// module.exports = {
//   search: async (req, res) => {
//     let options = [];
//     if (req.query.option == "title") {
//       options = [{ title: new RegExp(req.query.content) }];
//     } else if (req.query.option == "placeName") {
//       options = [{ content: new RegExp(req.query.content) }];
//     }  else {
//       const err = new Error("검색 옵션이 없습니다.");
//       err.status = 400;
//       throw err;
//     }

//     const board = (await Document.find())
//       .filter((item) => {
//         return req.user.perm("board", item.id + "").can("read");
//       })
//       .map((item) => item.id);

//     try {

//       res.status(200).json({

//             board: post.board,
//             _id: parseInt(post.id),
//             title: post.title,
//             content: post.content,
//             author: post.author,
//             isAnonymous: post.isAnonymous,
//             created_date: post.created_date,
//             view: post.view,
//             like: post.likes_count,
//             comment_count: post.comments.length,
//             comment: post.comments,
//       });
//     } catch (error) {
//       const errr = new Error("database error");
//       errr.status = 500;
//       throw errr;
//     }
//   },
// };
//검색 => 클라이언트?
