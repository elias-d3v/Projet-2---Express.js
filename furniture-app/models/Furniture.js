const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const furnitureSchema = new Schema({
  name:{type:String,required:true},
  category:{type:Schema.Types.ObjectId,ref:'Category',required:true},
  material:[{
    material:{type:Schema.Types.ObjectId,ref:'Material'},
    quantity:{type:Number,default:1}
  }],
  createdAt:{type:Date,default:Date.now}
});
module.exports = model('Furniture',furnitureSchema);