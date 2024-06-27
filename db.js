const mysql = require('mysql2')
require('dotenv').config();

const databaseUrl = process.env.JAWSDB_URL

if (!databaseUrl) {
  throw new Error('JAWSDB_URL environment variable is not set');
}

const match = databaseUrl.match(/mysql:\/\/([^:]+):([^@]+)@([^\/:]+)(?::(\d+))?\/(.+)/);
if (!match) {
  throw new Error('Invalid JAWSDB_URL format');
}


const [_, user, password, host, port = 3306, database] = match;

// Create a MySQL connection
const connection = mysql.createConnection({
  host,
  user,
  password,
  database,
  port
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection
