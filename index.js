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

app.post('/login', (req, res) => {
  console.log(`login api called with ${req.body.username} ${req.body.password}`);
  const username = req.body.username;
  const password = req.body.password;
  if(username == 'charishma' && password == 'mysecret')
  {
    res.status(201).json({status:'Login successful'})
  }
  else
  {
    res.status(401).json({status:'Login unsuccessful'})
  }
});

// Read a single todo by ID
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(todoitem => todoitem.id === parseInt(req.params.id));
  if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
  }
  res.json(todo);
});

// Update a todo by ID
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(todoitem => todoitem.id === parseInt(req.params.id));
  if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
  }
  todo.task = req.body.task || todo.task;
  todo.taskowner = req.body.taskowner || todo.taskowner;
  todo.completionDate = req.body.completionDate || todo.completionDate;
  res.json(todo);
});

// Delete a todo by ID
app.delete('/api/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(todoitem => todoitem.id === parseInt(req.params.id));
  if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  res.status(200).send(`Successfully Deleted todo with id ${req.params.id} located at ${todoIndex}`); // No content
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});