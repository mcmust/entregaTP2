const express = require('express');
const router = express.Router();
const db = require('./db');


/* 
 * USUARIOS
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
 * COMENTARIOS
 * 
 *
 */

router.post('/comments', (req, res) => {
  const { post_id, user_id, content } = req.body;
  
  const validatePostSql = 'SELECT 1 FROM posts WHERE id = ?';
  db.query(validatePostSql, [post_id], (err, results) => {
    if (err) {
      console.error('Error validating post_id:', err);
      return res.status(500).send({ error: 'Database error', details: err.message, sqlMessage: err.sqlMessage });
    }

    if (results.length === 0) {
      return res.status(400).send({ error: 'Invalid post_id', details: 'The specified post_id does not exist in the posts table.' });
    }

    const insertCommentSql = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
    db.query(insertCommentSql, [post_id, user_id, content], (err, result) => {
      if (err) {
        console.error('Error inserting comment:', err);
        return res.status(500).send({ error: 'Database error', details: err.message, sqlMessage: err.sqlMessage });
      }
      res.status(201).send(result);
    });
  });
});

router.get('/comments', (req, res) => {
  const sql = 'SELECT * FROM comments';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching comments:', err);
      return res.status(500).send({ error: 'Database error', details: err.message, sqlMessage: err.sqlMessage });
    }
    res.status(200).send(results);
  });
});

router.put('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { post_id, user_id, content } = req.body;
  const sql = 'UPDATE comments SET post_id = ?, user_id = ?, content = ? WHERE id = ?';
  db.query(sql, [post_id, user_id, content, id], (err, result) => {
    if (err) {
      console.error('Error updating comment:', err);
      return res.status(500).send({ error: 'Database error', details: err.message, sqlMessage: err.sqlMessage });
    }
    res.status(200).send(result);
  });
});

router.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM comments WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting comment:', err);
      return res.status(500).send({ error: 'Database error', details: err.message, sqlMessage: err.sqlMessage });
    }
    res.status(200).send(result);
  });
});

/* 
 * CATEGORIAS
 * 
 *
 */

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

module.exports = router; 
