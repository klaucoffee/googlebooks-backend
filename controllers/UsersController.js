const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const Users = require("../models/Users.js");
const jwt = require("jsonwebtoken");
const Library = require("../models/Library.js");

/////////////////////////REGISTER/////////////////////////

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

    if (createdUser) {
      res.status(200).json({ status: "success" });
      return;
    }
    //res.redirect('/');
  } catch (err) {
    res.status(500).json({ status: "failed" });
  }
});

/////////////////////////LOGIN/////////////////////////

users.post("/login", async (req, res) => {
  const { email, password } = req.body; //postman Body

  const user = await Users.findOne({ email });

  if (!user) {
    res.json({ status: "error" });
  } else if (bcrypt.compareSync(password, user.password)) {
    req.session.user = user.email;
    req.session.userId = user._id;
    console.log("from home", req.session);

    const userId = await Library.create({ userId: user._id });

    res
      // .cookie("newCookie", newToken)
      // .cookie("newCookie", newToken, { path: "/", httpOnly: true })
      .status(200)
      .json({ status: "success" });
    // .json({ token: newToken });
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
  req.session.destroy();
  res.json({ status: "success" });
});

module.exports = users;
