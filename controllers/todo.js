// Our Models
const Todo = require("../models/todos");
const todoController = {
  getTodo: (req, res) => {
    Todo.find()
      .lean()
      .then((result) => {
        console.log(result);
        res.render("todo", { todos: result });
        // res.json(result)
      })
      .catch((error) => console.log(error));
  },
  postTodo: (req, res) => {
    console.log(req.body);
    const todo = {
      id: 3,
      name: req.body.todo,
      completed: true,
    };

    const todos = new Todo(todo);
    todos
      .save()
      .then((result) => {
        res.redirect("/todos");
      })
      .catch((error) => console.log(error));
  },
  getSingleTodo: () => {
    return;
  },
  deleteTodo: () => {
    return;
  },
};

module.exports = todoController;
