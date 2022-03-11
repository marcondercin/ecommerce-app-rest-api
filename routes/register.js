const Pool = require('pg').Pool;
const config = require('./config.js');
const pool = new Pool(config);

const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  const text = req.query;
  res.send(text);
});

module.exports = router;