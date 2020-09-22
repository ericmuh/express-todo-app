const express = require("express");
const ehbs = require("express-handlebars");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

//* Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// *express handlebars
app.engine("hbs", ehbs({ extname: "hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");

// simple route with get
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// route rendering out out template todo.hbs //*GET TODOS: READ
app.get("/todos", (req, res) => {
  res.render("todo", { todos: todostore });
});

//! CRUD -create Read Update and Delete

//* POST TODOs : CREATE
app.post("/todos", (req, res) => {
  console.log(req.body);
  const todo = {
    id: 3,
    name: req.body.todo,
    completed: true,
  };
  todostore.push(todo);
  res.redirect("/todos");
});

// *API ENDPOINT
app.use("/api/todos", require("./routes/api/todos"))





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
