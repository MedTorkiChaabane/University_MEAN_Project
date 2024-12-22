// import mongoose module
const mongoose= require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
// Schema
const userSchema= mongoose.Schema({
   firstName:{ type: String, required: true },
   lastName: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password:{ type: String, required: true },
   role:{ type: String, required: true },
   tel:{ type: Number, required: true, unique: true},
   address: { type: String, required: true },
   status: String,
   idTeacher: String,
   courseTab: [],
   telChild: Number,
   level:String,
   speciality: String,
   img:String,
   cv: String,

});
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);
// Model Name ( collection "users" will be created/generated)
const user = mongoose.model("User", userSchema);
// Make file exportable
module.exports = user;