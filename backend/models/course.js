// import mongoose module
const mongoose = require("mongoose");
// Schema
const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    modules: { type: Number, required: true },
    price: { type: Number, required: true },
    idTeacher: { type: String, required: true },
    img: {type: String, required: true }
});
// Model Name ( collection "courses" will be created/generated)
const course = mongoose.model("Course", courseSchema);
// Make file exportable
module.exports = course;