const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hello');
});

router.get('/:id', (req, res, next) => {
  res.send('Hello there');
});