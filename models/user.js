const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
      unique: true
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

const User = mongoose.model("User", userSchema)

module.exports = User;

// User.associate = models => {
//    User.hasMany(models.Order, { foreignKey: "user_id" })
//    User.hasMany(models.CartItem, { foreignKey: "user_id" })
// }




