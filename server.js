//****************DEPENDENCIES***************
//CHANGES2
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("./users");
const transactions = require("./transactions");
const cors = require("cors");
const mongoose = require("mongoose");
// const journalController = require("./controllers/journalController.js");
// const usersController = require("./controllers/UsersController.js");
// const CommentsController = require("./controllers/CommentsController.js");

const session = require("express-session");

const app = express();
const PORT = process.env.PORT; // 2000;
const MONGODB_URI = process.env.MONGODB_URI; // "mongodb://localhost:27017/googlebooks";

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
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true, //changed this to true
    // add the cookie stuff below
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);
// app.use(
// 	session({
// 		secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
// 		cookie: { httpOnly: false },
// 		resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
// 		saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
// 	})
// );
// server.js cors settings
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://googlebooks-frontend.vercel.app/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());

//****************ROUTES***************//
// app.use("/daybits/journal", journalController);
// app.use("/daybits/register", usersController);
// app.use("/daybits/comments", CommentsController);

const verifyToken = (req, res, next) => {
  //MIDDLEWARE to verify token
  try {
    const authToken = req.headers.token;

    // validate the token
    const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);

    // if valid, retrieve the username from the token
    const username = decoded.user;

    req.user = username;

    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

app.get("/", (req, res) => {
  res.send("Hello WORLDDD");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body; //postman Body

  if (users[username].password === password) {
    //authenticate and create the jwt
    const newToken = jwt.sign(
      {
        user: username, //token has key as user
      },
      process.env.TOKEN_SECRET,
      { expiresIn: 60 * 60 }
    );

    res
      .status(200)
      .cookie("NewCookie", newToken, { path: "/", httpOnly: true })
      .send("cookie");
  } else {
    res.status(403).send("unauthorised");
  }
});

app.post("/posts", verifyToken, (req, res) => {
  //verifyToken used here
  const username = req.user;
  const userTransactions = transactions[username];
  res.status(200).json({ transactions: userTransactions });
});

app.post("/logout", (req, res) => {
  res.clearCookie("NewCookie").send("cookie dead");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
