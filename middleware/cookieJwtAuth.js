const jwt = require('jsonwebtoken');

exports.cookieJwtAuth = async (req, res, next) => {
    const accessToken = await req.signedCookies["access-token"];
    
    try {
        const {id} = jwt.verify(accessToken, process.env.SECRET);
        req.id = id;
        next(req, res);
    } catch (error) {
        return res.clearCookie("access-token").status(403).send(error);
    }
};