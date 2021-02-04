const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
   firstname: {
      type: String,
      require: true,
      trim: true,
   },
   lastname: {
      type: String,
      require: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 6,
   },
   phone_number: {
      type: String,
      require: true,
      trim: true,
   },
   address: {
      type: String,
      trim: true,
   }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
      
   

