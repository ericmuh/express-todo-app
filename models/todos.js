const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// database s
const todoSchema = new Schema({
  name: String,
  completed: Boolean,
});

// Creating the model
const Todo = mongoose.model("Todo", todoSchema);

// makes a collection of todos
// first arg => our collection in single(todos)
// second arg=> our schema (how the data is structured)


module.exports = Todo;
