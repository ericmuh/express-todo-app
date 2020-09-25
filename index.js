const express = require("express");
const ehbs = require("express-handlebars");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
// connecting to mongodb using mongodbClient driver

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
app.get("/todos", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db("todoapp");
    const todos = db
      .collection("todos")
      .find()
      .toArray((err, data) => {
        assert.equal(null, err);
        console.log(data);
        res.render("todo", { todos: data });
        client.close();
      });
  });

});

//* POST TODOs : CREATE
app.post("/todos", (req, res) => {
  console.log(req.body);
  const todo = {
    id: 3,
    name: req.body.todo,
    completed: true,
  };
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db("todoapp");
    const todos = db.collection("todos").insertOne(todo).then(()=>{
      res.redirect("/todos")
      client.close();
    }).catch(
      error=>console.log(error)
    )
    
  });
});

// *API ENDPOINT
app.use("/api/todos", require("./routes/api/todos"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



// ORM : object Relational Mapper

// ODM : Object Document Mapper : mongoose
