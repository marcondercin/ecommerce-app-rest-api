const Pool = require('pg').Pool;
const config = require('../config.js');
const pool = new Pool(config);

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  });
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});


module.exports = router;
