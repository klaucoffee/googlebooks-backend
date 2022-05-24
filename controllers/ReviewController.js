const bcrypt = require("bcrypt");
const express = require("express");
const review = express.Router();
const Users = require("../models/Users.js");
const jwt = require("jsonwebtoken");
const Library = require("../models/Library.js");
const Review = require("../models/Review.js");

/////////////////////////VERIFYTOKEN/////////////////////////
// const verifyToken = (req, res, next) => {
//   //MIDDLEWARE to verify token

//   function getCookie(cookieName) {
//     let cookie = {};
//     req.headers.cookie.split(";").forEach(function (el) {
//       let [key, value] = el.split("=");
//       cookie[key.trim()] = value;
//     });
//     return cookie[cookieName];
//   }

//   try {
//     const authToken = getCookie("newCookie");

//     const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);

//     //   if valid, retrieve the username from the token
//     const email = decoded.user;

//     req.user = email;

//     next();
//   } catch (error) {
//     res.sendStatus(403);
//   }
// };

///////////////////////Create Review Record//////////////////////
review.post("/", async (req, res) => {
  //const email = req.user;

  const filter = { email: req.session.user };

  try {
    //finding currentUser by email
    const currentUser = await Users.findOne(filter);
    const currentUserId = currentUser._id;
    // console.log("currentuserid", currentUserId);
    // console.log("reqbody", req.body);

    const currentBook = await Review.create([
      {
        userId: currentUserId,
        bookTitle: req.body.bookTitle,
        createdOn: req.body.createdOn,
      },
    ]);

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//////////////////POST BOOK REVIEW BY ID/////////////////////////
review.post("/:id", async (req, res) => {
  const filter = { email: req.session.user };
  const currentUser = await Users.findOne(filter);
  const currentUserId = currentUser._id;
  const query = { userId: currentUserId, bookTitle: req.params.id };

  Review.findOneAndUpdate(query, req.body)
    .then((data) => {
      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed" });
    });
});

///////////////////////GET REVIEWS/////////////////////////
review.get("/", async (req, res) => {
  const filter = { email: req.session.user };
  const currentUser = await Users.findOne(filter);
  const currentUserId = currentUser._id;
  Review.find({ userId: currentUserId })
    .then((review) => {
      res.status(200).json(review);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

///////////////////////DELETE/////////////////////////
review.delete("/", async (req, res) => {
  const filter = { email: req.session.user };
  const currentUser = await Users.findOne(filter);
  const title = JSON.stringify(req.body);
  const title1 = title.slice(14, title.length - 2);

  const currentUserId = currentUser._id;
  const query = { userId: currentUserId, bookTitle: title1 };

  Review.findOneAndDelete(query)
    .then((data) => {
      res.status(200).json({ status: "success" });
    })
    .catch((err) => {
      res.status(500).json({ status: "failed" });
    });
});

module.exports = review;
