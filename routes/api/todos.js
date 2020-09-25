const express = require("express");
const router = express.Router();
const todos = require("../../todostore");

// *GET ALL TODOS ENDPOINT
router.get("/", (req, res) => {
  res.json(todos);
});

// *GET A SINGLE TODO
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  const singleTodo = todos.filter((todo) => {
    return todo.id == req.params.id;
  });
  console.log(singleTodo);
  res.json(singleTodo);
});

// *POST ENDPOINT : Creating a todo
router.post("/", (req, res) => {
  const todo = {
    id: 3,
    name: req.body.todo,
    completed: true,
  };
  todos.push(todo);
  console.log(todo);
  res.json({ msg: "todo created", todos: todos });
});

// *DELETE ENPOINT

router.delete("/:id", (req, res) => {
  const todoindex = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(todoindex, 1);
  res.json({ msg: "todo deleted", todos: todos });
});

// *UPDATE ENDPOINT

router.put("/:id", (req, res) => {
  const todo = {
    id: 3,
    name: req.body.todo,
    completed: true,
  };
  const todoindex = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(todoindex, 1, todo);
  res.json({ msg: "todo updated", updatedTodo: todo });
});

module.exports = router;

// TODO : install mangodb
// TODO : configure it for machine
// TODO : learn to use mangodb
// TODO : learn connected mangodb to express app

// ? passportjs
// ? mangose
// ? JWT

















