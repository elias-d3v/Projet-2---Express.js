
const mongoose  = require('mongoose');
const Supplier  = require('./models/Supplier');
const Material  = require('./models/Material');

(async () => {
  await mongoose.connect('mongodb://localhost:27017/furniture_db');

  const [bBois, metaLo, pPlastique] = await Supplier.insertMany([
    { name: 'BBois' }, { name: 'MetaLo' }, { name: 'pPlastique' }
  ], { ordered: false }).catch(()=>Supplier.find());

  await Material.insertMany([
    { name:'Frêne',      type:'Bois',       supplier:bBois._id,  keywords:['clair','bois'] },
    { name:'Chêne',      type:'Bois',       supplier:bBois._id,  keywords:['dur'] },
    { name:'Noyer',      type:'Bois',       supplier:bBois._id,  keywords:['foncé'] },
    { name:'Acier Inox', type:'Fer',        supplier:metaLo._id, keywords:['inox'] },
    { name:'Aluminum',   type:'Fer',        supplier:metaLo._id, keywords:['léger'] },
    { name:'Plastique',  type:'Plastique',  supplier:pPlastique._id, keywords:['plastique'] }
  ], { ordered:false });

  console.log('✅ Matériaux + fournisseurs seedés');
  process.exit();
})();
