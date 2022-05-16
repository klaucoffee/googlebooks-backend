const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const Users = require("../models/Users.js");
const jwt = require("jsonwebtoken");

/////////////////////////REGISTER/////////////////////////
//Index route. Receiving the data from the front-end when user registers.
// users.get("/registration", (req, res) => {
//   Users.find()
//     .then((userInfo) => {
//       res.json(userInfo);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

//Adds new users accounts to MongoDB.
users.post("/registration", async (req, res) => {
  //const username = req.body.username

  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  try {
    const createdUser = await Users.create(req.body);
    console.log("created user is: ", createdUser);
    if (createdUser) {
      res.status(200).json({ status: "success" });
      return;
    }
    //res.redirect('/');
  } catch (err) {
    res.status(500).json({ status: "failed" });
    console.log(err);
  }
});

/////////////////////////LOGIN/////////////////////////
const verifyToken = (req, res, next) => {
  //MIDDLEWARE to verify token
  console.log("COOKIE", req.headers.Cookie);
  try {
    const authToken = req.headers.token; //token is now in header. Token is the cookie value
    //const authToken = req.headers.Cookie;

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

users.post("/login", async (req, res) => {
  const { email, password } = req.body; //postman Body
  console.log("body", req.body);
  const user = await Users.findOne({ email });
  console.log(user);

  if (!user) {
    res.json({ status: "error" });
  } else if (bcrypt.compareSync(password, user.password)) {
    const newToken = jwt.sign(
      {
        user: email, //token has key as user
      },
      process.env.TOKEN_SECRET,
      { expiresIn: 60 * 60 }
    );

    res
      .status(200)
      .cookie("NewCookie", newToken, { path: "/", httpOnly: true })
      .send({ status: "success" });
  } else {
    res.status(403).send("unauthorised");
  }
});

// app.post("/posts", verifyToken, (req, res) => {
//   //verifyToken used here
//   const username = req.user;

//   const userTransactions = transactions[username];
//   res.status(200).json({ transactions: userTransactions });
// });

users.post("/logout", (req, res) => {
  res.clearCookie("NewCookie").send({ status: "success" });
});

module.exports = users;
