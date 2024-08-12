const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
console.log('Express api poc')
const port = process.env.PORT || 3000;

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
  });

let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});