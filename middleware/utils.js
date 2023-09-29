const jwt = require('jsonwebtoken');

export const generateToken = (user) => {
    delete user.password;
    const token = jwt.sign(user , process.env.SECRET, { expiresIn: 3600 });
};