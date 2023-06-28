const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;
var todos = [];

app.use(bodyParser.json());

app.get("/todos/:id", (req, res) => {
  const todoId = req.params.id;

  fs.readFile("todos.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    const todos = data.split("\n");
    const filteredTodos = todos.filter((todo) => todo.trim() !== "");

    const todo = filteredTodos.find((todo) => {
      const parsedTodo = JSON.parse(todo);
      return parsedTodo.id === parseInt(todoId);
    });

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    res.status(200).send(JSON.parse(todo));
  });
});

app.get("/todos", (req, res) => {
  fs.readFile("todos.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    const todos = data.split("\n");

    const filteredTodos = todos.filter((todo) => todo.trim() !== "");

    const parsedTodos = filteredTodos.map((todo) => JSON.parse(todo));

    res.status(200).send(parsedTodos);
  });
});
app.post("/todos", (req, res) => {
  const todoObject = {
    id: Math.ceil(Math.random() * 100000),
    title: req.body.title,

    description: req.body.description,
  };

  todos.push(todoObject);
  const todoString = JSON.stringify(todoObject);
  fs.appendFile("todos.txt", todoString + "\n", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).send("Error writing to file");
    }

    res.status(200).send(todoObject);
  });
  console.log(todos);
});
app.put("/todos/:id", (req, res) => {
  const todoId = req.params.id;

  fs.readFile("todos.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    let todos = data.split("\n");
    todos = todos.filter((todo) => todo.trim() !== "");

    const todoIndex = todos.findIndex((todo) => {
      const parsedTodo = JSON.parse(todo);
      return parsedTodo.id === parseInt(todoId);
    });

    if (todoIndex === -1) {
      return res.status(404).send("Todo not found");
    }

    const updatedTodo = JSON.parse(todos[todoIndex]);

    updatedTodo.title = req.body.title;
    updatedTodo.description = req.body.description;

    todos[todoIndex] = JSON.stringify(updatedTodo);

    const updatedData = todos.join("\n");

    fs.writeFile("todos.txt", updatedData, "utf8", (err) => {
      if (err) {
        console.error("Error updating todo:", err);
        return res.status(500).send("Error updating todo");
      }

      res.status(200).send(updatedTodo);
    });
  });
});
app.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;

  fs.readFile("todos.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    let todos = data.split("\n");
    todos = todos.filter((todo) => todo.trim() !== "");

    const todoIndex = todos.findIndex((todo) => {
      const parsedTodo = JSON.parse(todo);
      return parsedTodo.id === parseInt(todoId);
    });

    if (todoIndex === -1) {
      return res.status(404).send("Todo not found");
    }

    const deletedTodo = JSON.parse(todos[todoIndex]);

    todos.splice(todoIndex, 1);

    const updatedData = todos.join("\n");

    fs.writeFile("todos.txt", updatedData, "utf8", (err) => {
      if (err) {
        console.error("Error deleting todo:", err);
        return res.status(500).send("Error deleting todo");
      }

      res.status(200).send(deletedTodo);
    });
  });
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
