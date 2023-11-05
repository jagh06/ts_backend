const { clientModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJWT");


// Para verificar si el token es valido 
const authMiddleware = async (req, res, next) => {
    try {
        console.log(req)
        if(!req.headers.authorization) {
            handleHttpError(res,  "NEED_SESSION", 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        if(!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }

        const user = await clientModel.findById(dataToken._id)
        req.user = user

        next()
    } catch (error) {
        handleHttpError(res, "NO_SESSION", 401)
    }
}

module.exports = authMiddleware;