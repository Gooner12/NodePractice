const mongoose = require("mongoose");
const bcrypt = require('bcryptjs'); // this library is used for hashing the password
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'
    ],
    unique: true, // unique is not a validator, it creates a unique index which means only a single email is registered for a user
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,

  },
});

UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
}) // using function here instead of other arrow functions set up the scoping for our function to the document


// generate name using the instance method of schema. i.e. when an instance of user schema is created we can access methods function to create name
UserSchema.methods.createJWT = function () {
  return jwt.sign({userId:this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

module.exports = mongoose.model('User', UserSchema);
