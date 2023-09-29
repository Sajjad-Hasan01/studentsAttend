const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getUser = async (email) => {
    return UserModel.findOne({ email });
};

module.exports = async (request, response) => {
    const {email, password} = request.body;
    const user = await getUser(email);

    if (! bcrypt.compare(password , user.password)){
        return response.status(403).json({ error: "password not correct, try again" })
    }
    
    delete user.password;

    const token = jwt.sign(user , process.env.SECRET, { expiresIn: 3600 });
    
    response.cookie("token", token, {
        httpOnly: true,
        secret: true,
        maxAge: 3600,
        signed: true
    });

    response.redirect("/");
}