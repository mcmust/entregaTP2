const express = require('express');
const router = express.Router();
const db = require('./db');


/* 
 * USERS
 * 
 *
 */
 
router.post('/users', (req, res) => {
  const { name, email, age } = req.body
  const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)'
  db.query(sql, [name, email, age], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(201).send(result)
  })
})

router.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users'
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(results)
  })
})

router.put('/users/:id', (req, res) => {
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

router.delete('/users/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM users WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(result)
  })
})

/* 
 * POSTS
 * 
 *
 */
 
router.post('/posts', (req, res) => {
  const { user_id, title, content } = req.body
  const sql = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)'
  db.query(sql, [user_id, title, content], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(201).send(result)
  })
})

router.get('/posts', (req, res) => {
  const sql = 'SELECT * FROM posts'
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(results)
  })
})

router.put('/posts/:id', (req, res) => {
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

router.delete('/posts/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM posts WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(result)
  })
})

/* 
 * COMMENTS
 * 
 *
 */

router.post('/comments', (req, res) => {
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

router.get('/comments', (req, res) => {
  const sql = 'SELECT * FROM comments'
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(results)
  })
})

router.put('/comments/:id', (req, res) => {
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

router.delete('/comments/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM comments WHERE id = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.status(200).send(result)
  })
})

/* 
 * CATEGORIES
 * 
 *
 */

 // CATEGORIES
router.post('/categories', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO categories (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(result);
  });
});

router.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

router.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM categories WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(result);
  });
});



router.post('/populateCategories', (req, res) => {
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

module.exports = router; 
