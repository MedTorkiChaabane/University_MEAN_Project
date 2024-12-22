// import mongoose module
const mongoose= require("mongoose");
// Schema
const opinionSchema= mongoose.Schema({
   subject:{ type: String, required: true },
   idTeacher: { type: String, required: true },
   idStudent: { type: String, required: true },
});
// Model Name ( collection "opinions" will be created/generated)
const opinion = mongoose.model("Opinion", opinionSchema);
// Make file exportable
module.exports = opinion;