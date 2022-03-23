const Pool = require('pg').Pool;
const config = require('../config.js');
const pool = new Pool(config);

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  });
});