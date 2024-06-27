const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')
const db = require('./db')
const routes = require('./routes');

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

// Use the routes from routes.js
app.use('/api', routes);

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
