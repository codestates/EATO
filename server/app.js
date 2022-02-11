// const express = require("express");
// const dotenv = require("dotenv");
// import connectDB from "./dbcon";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// //app.use(express.urlencoded({ extended: true }));

// // app.use(
// //   cors({
// //     origin: "*",
// //     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
// //   })
// // );

// app.get("/", (req, res) => {
//   res.send("Geutda API is running...");
// });

// // app.use("/api/users", userRoutes);
// // app.use("/api/contents", contentRoutes);

// // // custom handler for error
// // app.use(notFound);
// // app.use(errHandler);

// const PORT = process.env.PORT || 3000;

// const server = app.listen(PORT, () =>
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// );

// export default server;

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://cluster0.znmpy.mongodb.net/myFirstDatabase")
  .then(() => console.log("MongoDB Connected success!"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello EATO World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
