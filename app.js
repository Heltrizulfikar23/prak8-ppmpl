const express = require('express');
const app = express();


app.use(express.json());


let data = [
  { id: 1, name: 'User One', age: 30 },
  { id: 2, name: 'User Two', age: 35 },
];


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.post('/data', (req, res) => {
  const { name, age } = req.body;

  
  if (!name || !age) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  
  const newItem = {
    id: data.length + 1, 
    name,
    age,
  };
  data.push(newItem);

  res.status(201).json(newItem); 
});


app.put('/data/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const item = data.find((d) => d.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ error: 'Resource not found' });
  }


  if (name) item.name = name;
  if (age) item.age = age;

  res.status(200).json(item); 
});

app.delete('/data/:id', (req, res) => {
  const { id } = req.params;

  
  const index = data.findIndex((d) => d.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  // Hapus data
  data.splice(index, 1);

  res.status(204).send(); 
});

module.exports = app;
