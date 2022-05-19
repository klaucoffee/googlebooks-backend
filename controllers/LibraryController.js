const bcrypt = require("bcrypt");
const express = require("express");
const library = express.Router();
const Library = require("../models/Library.js");
const Users = require("../models/Users.js");
const jwt = require("jsonwebtoken");

/////////////////////////LOGIN/////////////////////////
const verifyToken = (req, res, next) => {
  //MIDDLEWARE to verify token

  function getCookie(cookieName) {
    let cookie = {};
    req.headers.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    return cookie[cookieName];
  }

  try {
    const authToken = getCookie("newCookie");

    const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);

    //   if valid, retrieve the username from the token
    const email = decoded.user;

    req.user = email;

    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

library.post("/", verifyToken, async (req, res) => {
  const email = req.user;

  const filter = { email: req.user };

  try {
    //finding currentUser by email
    const currentUser = await Users.findOne(filter);
    const currentUserId = currentUser._id;
    console.log("currentuserid", currentUserId);

    const currentBook = await Library.create([
      {
        userId: currentUserId,
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        thumbnail: req.body.thumbnail,
      },
    ]);

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

library.get("/", verifyToken, (req, res) => {
  //CODE
});

// library.post("/posts", verifyToken, (req, res) => {
//   //verifyToken used here
//   const username = req.user;

//   const userTransactions = transactions[username];
//   res.status(200).json({ transactions: userTransactions });
// });

module.exports = library;
