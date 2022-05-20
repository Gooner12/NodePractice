const mongoose = require("mongoose");

// setting up the schema for the collection in our mongo db database
// only the properties specified in the schema will be passed rest of the properties will be ignored
// the object constructor is used for validating data during the insertion into the database
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  completed: {type:Boolean, default: false},
});

module.exports = mongoose.model("Task", TaskSchema);
