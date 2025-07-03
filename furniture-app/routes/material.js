const express   = require('express');
const router    = express.Router();
const auth      = require('../middleware/auth');
const Material  = require('../models/Material');
const Furniture = require('../models/Furniture');
const Supplier = require('../models/Supplier');

router.get('/', auth, async (req, res) => {
  const materials = await Material.find().populate('supplier');
  res.render('material/list', { materials });
});

router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
                                   .populate('supplier');

    const furnitures = await Furniture.find({ 'material.material': material._id })
                                      .populate('category');

    res.render('material/detail', { material, furnitures });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});


module.exports = router;
