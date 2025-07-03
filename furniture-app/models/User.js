const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username:{type:String,required:true,unique:true},
  password:{type:String,required:true}
});
userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
});
userSchema.methods.comparePassword = function(cand){
  return bcrypt.compare(cand,this.password);
};
module.exports = model('User',userSchema);                                                      