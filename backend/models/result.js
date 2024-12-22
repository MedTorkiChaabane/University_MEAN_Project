// import mongoose module
const mongoose = require("mongoose");
// Schema
const courseSchema = mongoose.Schema({
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    idStudent: { type: String, required: true },
    idTeacher: { type: String, required: true },
});
// Model Name ( collection "results" will be created/generated)
const result = mongoose.model("Result", courseSchema);
// Make file exportable
module.exports = result;