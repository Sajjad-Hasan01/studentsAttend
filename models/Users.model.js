const {Schema, model} = require('mongoose');
const UserSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    photo:{type:String},
    role:{type:String, required:true, default:'student'},
});
const UserModel = model('users', UserSchema);
module.exports = UserModel;