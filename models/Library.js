const mongoose = require("mongoose");
const { Schema } = mongoose;

const librarySchema = mongoose.Schema({
  userId: { type: String },
  bookTitle: { type: String },
  bookAuthor: [{ type: String }],
  thumbnail: { type: String },
  review: { type: String },
  read: { type: Boolean },
});

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
