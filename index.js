const express = require("express");
const ehbs = require("express-handlebars");
const mongoose = require("mongoose");
const assert = require("assert");
const todoController = require("./controllers/todo");

const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// *connecting to mongodb database using mongoose

// Connection URL
const url = "mongodb://localhost:27017/todoapp";

// asynchronous : promise
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Server connected");
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));

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
// route rendering out out template todo.hbs
//*GET TODOS: READ
app.get("/todos", todoController.getTodo);

//* POST TODOs : CREATE
app.post("/todos", todoController.postTodo);

// *API ENDPOINT
app.use("/api/todos", require("./routes/api/todos"));

// ORM : object Relational Mapper

// ODM : Object Document Mapper : mongoose
