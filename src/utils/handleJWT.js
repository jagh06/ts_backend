const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

// Pasar el objeto del usuario
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
    return sign;
}

// Pasar el token de session el jwt
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        return null;
    }
}

module.exports = {  tokenSign, verifyToken };

//https://jwt.io/