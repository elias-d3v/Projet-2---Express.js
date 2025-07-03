const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

router.get('/new', auth, (req, res) => {
  res.render('category/new');
});

router.post('/new', auth, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.redirect('/categories/new');
  await Category.create({ name });
  res.redirect('/furnitures');
});

module.exports = router;
