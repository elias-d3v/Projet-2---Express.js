const express = require('express');
const router = express.Router();
const Furniture = require('../models/Furniture');
const Category = require('../models/Category');
const Material = require('../models/Material');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const furnitures = await Furniture.find().populate('category').populate('material.material');

  const categoryCount = {};
  furnitures.forEach(f => {
    const catName = f.category ? f.category.name : 'Non catégorisé';
    categoryCount[catName] = (categoryCount[catName] || 0) + 1;
  });

  const chartCategoryData = {
    labels: Object.keys(categoryCount),
    datasets: [{
      label: 'Meubles par catégorie',
      data: Object.values(categoryCount)
    }]
  };

  const materialQuantities = {};
  furnitures.forEach(f => {
    f.material.forEach(m => {
      const matName = m.material?.name;
      const qty = Number(m.quantity) || 0;
      if (matName) {
        materialQuantities[matName] = (materialQuantities[matName] || 0) + qty;
      }
    });
  });

  const chartMaterialData = {
    labels: Object.keys(materialQuantities),
    datasets: [{
      label: 'Quantité totale par matière',
      data: Object.values(materialQuantities)
    }]
  };

  res.render('stats', {
    chartCategoryData: JSON.stringify(chartCategoryData),
    chartMaterialData: JSON.stringify(chartMaterialData)
  });
});

module.exports = router;
