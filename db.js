const mysql = require('mysql2')

const databaseUrl = process.env.JAWSDB_URL

// Parse the database URL
const match = databaseUrl.match(/mysql:\/\/([^:]+):([^@]+)@([^\/]+)\/(.+)/)
const [_, user, password, host, database] = match

// Create a MySQL connection
const connection = mysql.createConnection({
  host,
  user,
  password,
  database,
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err)
    return
  }
  console.log('Connected to the database')
})

module.exports = connection
