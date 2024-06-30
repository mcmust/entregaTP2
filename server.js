const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
const db = require('./db')
const routes = require('./routes');


const app = express()
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())
app.use(cors())

// Use the routes from routes.js
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Something went wrong:', err);
  res.status(500).send({ error: 'Something went wrong', details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
