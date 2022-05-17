const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  library: [{ type: Schema.Types.ObjectId, ref: "Library" }],
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
