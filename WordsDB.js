const mongoose = require("mongoose");

const wordsDBSchema = mongoose.Schema({
    wordsList: [String],
    key: String
})

module.exports = mongoose.model("WordsDB", wordsDBSchema);