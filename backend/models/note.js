// import mongoose module
const mongoose= require("mongoose");
// Schema
const noteSchema= mongoose.Schema({
   value:{ type: Number, required: true },
   idTeacher: { type: String, required: true },
   idStudent: { type: String, required: true },
});
// Model Name ( collection "notes" will be created/generated)
const note = mongoose.model("Note", noteSchema);
// Make file exportable
module.exports = note;