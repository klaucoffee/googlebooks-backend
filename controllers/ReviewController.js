const bcrypt = require("bcrypt");
const express = require("express");
const review = express.Router();
const Users = require("../models/Users.js");
const jwt = require("jsonwebtoken");
const Library = require("../models/Library.js");
const Review = require("../models/Review.js");

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

module.exports = review;
