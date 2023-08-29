const {Schema, model} = require('mongoose')
const StudentSchema = new Schema({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    group:{type:String,required:true},
    photo:{type:String},
})
const StudentModel = model('students', StudentSchema)
module.exports = StudentModel