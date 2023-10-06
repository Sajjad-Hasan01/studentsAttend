const StudentModel = require('../models/Students.model');

exports.attendCalc = async () => {
    const students = await StudentModel.find().populate('lectures');
    try {
        students.forEach(async s => {
            let notAttCount = 0;
            s.lectures.forEach(({attendance}) => {
                if (!attendance) notAttCount ++;
            });
            if (notAttCount >= 2 && notAttCount < 4) {                
                s.status = "Warning";
                await s.save();
            } else if (notAttCount >= 4) {
                s.status = "Separation"; 
                await s.save();
            } else {
                s.status = "Continuous"; 
                await s.save();
            }
        });
        // res.status(200).send("Students status updated !");
        return 1;
    } catch (error) {
        // res.status(500).send(error);
        return 0;
    }
}