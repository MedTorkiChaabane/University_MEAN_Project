// import mongoose module
const mongoose = require("mongoose");
// Schema
const questionSchema = mongoose.Schema({
    question: { type: String, required: true },
    answerOne: { type: String, required: true },
    answerTwo: { type: String, required: true },
    answerThree: { type: String, required: true },
    rightAnswer: { type: String, required: true },
    idTeacher: { type: String },
});
// Model Name ( collection "questions" will be created/generated)
const question = mongoose.model("Question", questionSchema);
// Make file exportable
module.exports = question;