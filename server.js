const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Musculoca1', // Replace with your MySQL root password
  database: 'fullstack_app',
})

db.connect((err) => {
  if (err) {
    console.error('error connecting to db:', err)
  } else {
    console.log('connected to db')
  }
})

// CRUD operations for Users

// Create User
app.post('/users', (req, res) => {
  const { name, email, age } = req.body
  const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)'
  db.query(sql, [name, email, age], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(201).send(result)
  })
})

// Read Users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users'
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(results)
  })
})

// Update User
app.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { name, email, age } = req.body
  const sql = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?'
  db.query(sql, [name, email, age, id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(result)
  })
})

// Delete User
app.delete('/users/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM users WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(result)
  })
})

// CRUD operations for Posts

// Create Post
app.post('/posts', (req, res) => {
  const { user_id, title, content } = req.body
  const sql = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)'
  db.query(sql, [user_id, title, content], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(201).send(result)
  })
})

// Read Posts
app.get('/posts', (req, res) => {
  const sql = 'SELECT * FROM posts'
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(results)
  })
})

// Update Post
app.put('/posts/:id', (req, res) => {
  const { id } = req.params
  const { user_id, title, content } = req.body
  const sql =
    'UPDATE posts SET user_id = ?, title = ?, content = ? WHERE id = ?'
  db.query(sql, [user_id, title, content, id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(result)
  })
})

// Delete Post
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM posts WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(result)
  })
})

// CRUD operations for Comments

// Create Comment
app.post('/comments', (req, res) => {
  const { post_id, user_id, content } = req.body
  const sql =
    'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)'
  db.query(sql, [post_id, user_id, content], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(201).send(result)
  })
})

// Read Comments
app.get('/comments', (req, res) => {
  const sql = 'SELECT * FROM comments'
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(results)
  })
})

// Update Comment
app.put('/comments/:id', (req, res) => {
  const { id } = req.params
  const { post_id, user_id, content } = req.body
  const sql =
    'UPDATE comments SET post_id = ?, user_id = ?, content = ? WHERE id = ?'
  db.query(sql, [post_id, user_id, content, id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(result)
  })
})

// Delete Comment
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM comments WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(result)
  })
})

// Prepopulate Categories (if not already populated)
app.post('/populateCategories', (req, res) => {
  const categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Health' },
    { id: 3, name: 'Lifestyle' },
    { id: 4, name: 'Education' },
  ]

  categories.forEach((category) => {
    const sql = 'INSERT IGNORE INTO categories (id, name) VALUES (?, ?)'
    db.query(sql, [category.id, category.name], (err, result) => {
      if (err) {
        return res.status(500).send(err)
      }
    })
  })

  res.send('Categories populated successfully')
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
