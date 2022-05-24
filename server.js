//****************DEPENDENCIES***************
//CHANGES3
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("./userstesting");
const transactions = require("./transactions");
const cors = require("cors");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const journalController = require("./controllers/journalController.js");
const UsersController = require("./controllers/UsersController.js");
const LibraryController = require("./controllers/LibraryController.js");
const ReviewController = require("./controllers/ReviewController.js");

const session = require("express-session");

const app = express();
const PORT = process.env.PORT; // 2000;
const MONGODB_URI = process.env.MONGODB_URI; // "mongodb://localhost:27017/googlebooks";
//mongodb+srv://klau1:Peanut123@cluster0.xdqfk.mongodb.net/googlebooks

// Error / Disconnection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

//****************MIDDLEWARES***************//
app.set("trust proxy", 1); // add this line
app.use(express.static("public")); //overwrites the path - access the public folder (works for static html file)
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true, //changed this to true
//     // add the cookie stuff below
//     cookie: {
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       secure: process.env.NODE_ENV === "production",
//     },
//   })
// );
// app.use(
// 	session({
// 		secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
// 		cookie: { httpOnly: false },
// 		resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
// 		saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
// 	})
// );
// server.js cors setting
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://googlebooks-frontend-k.herokuapp.com",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());

//****************ROUTES***************//
// app.use("/daybits/journal", journalController);
app.use("/", UsersController);
app.use("/library", LibraryController);
app.use("/review", ReviewController);

app.get("/", (req, res) => {
  res.send("Hello WORLDDD 3");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
