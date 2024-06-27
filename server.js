const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
const db = require('./db')
const routes = require('./routes');


const app = express()
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))

app.use(bodyParser.json())
app.use(cors())

// Use the routes from routes.js
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
