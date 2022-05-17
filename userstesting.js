const users = {
  Michael: {
    password: "123456",
  },
  klau: {
    password: "32456",
  },
};

module.exports = users;

//SAMPLE CODE FOR JWT
// users.post("/login", async (req, res) => {
//   const { email, password } = req.body; //postman Body

//   const user = await Users.findOne({ email });

//     if (users[username].password === password) {
//       //authenticate and create the jwt
//       const newToken = jwt.sign(
//         {
//           user: username, //token has key as user
//         },
//         process.env.TOKEN_SECRET,
//         { expiresIn: 60 * 60 }
//       );

//       res
//         .status(200)
//         .cookie("NewCookie", newToken, { path: "/", httpOnly: true })
//         .send("log in successful - cookie");
//     } else {
//       res.status(403).send("unauthorised");
//     }

// });

// app.post("/posts", verifyToken, (req, res) => {
//   //verifyToken used here
//   const username = req.user;

//   const userTransactions = transactions[username];
//   res.status(200).json({ transactions: userTransactions });
// });

// const verifyToken = (req, res, next) => {
//   //MIDDLEWARE to verify token
//   console.log("COOKIE", req.headers.Cookie);
//   try {
//     const authToken = req.headers.token; //token is now in header. Token is the cookie value
//     //const authToken = req.headers.Cookie;

//     // validate the token
//     const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);

//     // if valid, retrieve the username from the token
//     const username = decoded.user;

//     req.user = username;

//     next();
//   } catch (error) {
//     res.sendStatus(403);
//   }
// };
