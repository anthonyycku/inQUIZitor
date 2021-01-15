const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    question: String,
    answer: String,
    selection: [String],
    completed: Boolean
})

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;