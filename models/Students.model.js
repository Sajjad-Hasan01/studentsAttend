const mongoose = require('mongoose'), {Schema, model} = require('mongoose');
const StudentSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    group:{type:String, required:true},
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'lectures'
        }
    ],
    status:{type:String, require:true, default:"Continuous"}
});
const StudentModel = model('students', StudentSchema);
module.exports = StudentModel;