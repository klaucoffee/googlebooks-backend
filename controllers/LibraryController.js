const bcrypt = require("bcrypt");
const express = require("express");
const library = express.Router();
const Library = require("../models/Library.js");
const Users = require("../models/Users.js");
const jwt = require("jsonwebtoken");

/////////////////////////VERIFYTOKEN/////////////////////////
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

////////////////////CREATE BOOK/////////////////////////
library.post("/", verifyToken, async (req, res) => {
  const email = req.user;

  const filter = { email: req.user };

  try {
    //finding currentUser by email
    const currentUser = await Users.findOne(filter);
    const currentUserId = currentUser._id;
    //console.log("currentuserid", currentUserId);

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

////////////////////RETRIEVE BOOK/////////////////////////
library.get("/", verifyToken, async (req, res) => {
  const email = req.user;

  const filter = { email: req.user };
  const currentUser = await Users.findOne(filter);
  const currentUserId = currentUser._id;
  Library.find({ userId: currentUserId })
    .then((books) => {
      //console.log(books);
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

///////////////////////DELETE/////////////////////////
library.delete("/", verifyToken, async (req, res) => {
  const email = req.user;
  const filter = { email: req.user };
  const currentUser = await Users.findOne(filter);
  const title = JSON.stringify(req.body);
  const title1 = title.slice(14, title.length - 2);
  //console.log(title1);

  const currentUserId = currentUser._id;
  const query = { userId: currentUserId, bookTitle: title1 };

  Library.findOneAndDelete(query)
    .then((data) => {
      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed" });
    });
});

module.exports = library;
