const express   = require('express');
const router    = express.Router();
const auth      = require('../middleware/auth');

const Furniture = require('../models/Furniture');
const Category  = require('../models/Category');
const Material  = require('../models/Material');

/* ─── LISTE ───────────────────────────────────────────── */
router.get('/', auth, async (req, res) => {
  const furnitures = await Furniture
    .find()
    .populate('category')
    .populate('material.material');

  res.render('furniture/list', { furnitures });
});

/* ─── FORM NOUVEAU MEUBLE ─────────────────────────────── */
router.get('/new', auth, async (req, res) => {
  const categories = await Category.find();
  const material   = await Material.find();
  res.render('furniture/new', { categories, material });
});

/* ─── ENREGISTREMENT NOUVEAU MEUBLE ───────────────────── */
router.post('/new', auth, async (req, res) => {
  const { name, category, matIds, quantities } = req.body;     // arrays
  const mats = matIds.map((id, i) => ({ material: id, quantity: quantities[i] }));
  await Furniture.create({ name, category, material: mats });
  res.redirect('/furnitures');
});

/* ─── STATISTIQUES ─────────────────────────────────────── */
router.get('/stats', auth, async (req, res) => {
  const furnitures = await Furniture
    .find()
    .populate('category')
    .populate('material.material');

  /* 1. Meubles par catégorie */
  const categoryCount = {};
  furnitures.forEach(f => {
    const catName = f.category ? f.category.name : 'Autre';
    categoryCount[catName] = (categoryCount[catName] || 0) + 1;
  });

  /* 2. Quantités totales de chaque matière */
  const materialTotals = {};
  furnitures.forEach(f => {
    f.material.forEach(m => {
      if (m.material) {
        const matName = m.material.name;
        materialTotals[matName] = (materialTotals[matName] || 0) + Number(m.quantity || 1);
      }
    });
  });

  res.render('furniture/stats', { categoryCount, materialTotals });
});

/* ─── DÉTAIL MEUBLE ────────────────────────────────────── */
/* placer APRÈS /stats pour éviter la collision           */
router.get('/:id', auth, async (req, res) => {
  const furniture = await Furniture
    .findById(req.params.id)
    .populate('category')
    .populate('material.material');

  res.render('furniture/detail', { furniture });
});

module.exports = router;