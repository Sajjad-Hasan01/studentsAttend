const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/Users.model');
const StudentModel = require('../models/Students.model');

exports.signupRoute = async (req, res) => {
    const {name, email, password, group, keepLogin} = req.body, photo = req.file?.filename || null;

    UserModel.findOne({email}).then(user =>{
        if (user) return res.status(404).send('email already exist, change it or login');
        const hashedPassword = bcrypt.hashSync(password,1);

        UserModel.create({name, email, password: hashedPassword, photo})
        .then( user => {
            const period = keepLogin ? 2592000 : 86400;
            const accessToken = jwt.sign({id: user._id}, process.env.SECRET, { expiresIn: period });

            StudentModel.create({user: user._id, group})
            .then(() => {
                res.cookie("access-token", accessToken, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * period,
                    signed:false,
                }).status(201).send('Registration succeed');
            }).catch(() => res.status(501).send('there is error, please try again later'));
        }).catch(() => res.status(501).send('there is error, please try again later'));
    }).catch(() => res.status(500).send('there is error, please try again later'));
};