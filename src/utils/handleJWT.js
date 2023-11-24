const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );
    return sign;
}

const tokenSignForgotPassword = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "30m"
        }
    );
    return sign;
}

const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        return null;
    }
}

module.exports = {  tokenSign, verifyToken, tokenSignForgotPassword  };

//https://jwt.io/