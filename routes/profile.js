const StudentModel = require('../models/Students.model');

exports.profileRoute = async (req, res) => {
    const id = req?.id;
    StudentModel.findOne({ user: id }).populate('user').populate('lectures')
    .then(student => res.status(200).json(student))
    .catch(error => res.status(500).send(error.message))
};