const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/Users.model');

exports.loginRoute = async (req, res) => {
    const {email, password, keepLogin} = req.body;
    UserModel.findOne({ email })
    .then( user => {
        if (!user) return res.status(404).send(`email dosen't exist, check it again or sign up`);
        bcrypt.compare(password , user.password)
        .then(isPasswordValid => {
            if (isPasswordValid) {
                const period = keepLogin ? 2592000 : 86400;
                const accessToken = jwt.sign({id: user._id} , process.env.SECRET, { expiresIn: period });
                
                res.cookie("access-token", accessToken, {
                    httpOnly: false,
                    secure: false,
                    maxAge: 1000 * period,
                    signed:false,
                }).status(202).send('login successed');
            } else res.status(403).send('password is not correct');
        }).catch(() => res.status(500).send('there is error, please try again later'));
    }).catch(() => res.status(500).send('there is error, please try again later'));
}