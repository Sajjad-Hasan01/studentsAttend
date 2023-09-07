const mongoose = require('mongoose'), {Schema, model} = require('mongoose');
const LectureSchema = new Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    },
    date:{type:Date, default: Date.now()},
    attendance:{type:Boolean,required:true},
});
const LectureModel = model('lectures', LectureSchema);
module.exports = LectureModel;