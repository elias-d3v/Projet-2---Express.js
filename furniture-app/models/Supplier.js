const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const supplierSchema = new Schema({
  name: { type: String, required: true }
});

module.exports = model('Supplier', supplierSchema);
