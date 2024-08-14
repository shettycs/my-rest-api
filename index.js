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
  //const newTodo = req.body;
  var newTodo = {
    task: ''
    , taskowner: '',
    completionDate: ''
  };
  newTodo.task = req.body.task;
  newTodo.taskowner = req.body.taskowner;
  newTodo.completionDate = req.body.completionDate;
  newTodo.id = todos.length+1;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Read a single todo by ID
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(todoitem => todoitem.id === parseInt(req.params.id));
  if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
  }
  res.json(todo);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});