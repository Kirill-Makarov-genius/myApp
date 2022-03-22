const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    bookcover: String
});

module.exports = mongoose.model("Book", bookSchema);