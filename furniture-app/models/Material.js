const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const materialSchema = new Schema({
  name:     { type: String, required: true },
  type:     { type: String, enum: ['Bois', 'Fer', 'Plastique'], required: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  keywords: [String]
});

module.exports = model('Material', materialSchema);
