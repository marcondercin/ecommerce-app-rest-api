const Pool = require('pg').Pool;
const creds = require('./dbCreds.js');
const pool = new Pool(creds);

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM customers ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  });
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM customers WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});


module.exports = router;
