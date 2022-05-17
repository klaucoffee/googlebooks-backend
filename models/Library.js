const mongoose = require("mongoose");
const { Schema } = mongoose;

const librarySchema = mongoose.Schema({
  bookTitle: { type: String },
  bookAuthor: [{ type: String }],
  thumbnail: { type: String },
  review: { type: String },
  read: { type: Boolean },
  createdOn: { type: Date },
});

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
