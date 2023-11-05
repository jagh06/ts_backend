const { handleHttpError } = require("../utils/handleHttpError");


// Array con los roles permitidos
const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        console.log({ user });
        const roleslByUser = user.role; //TODO: ["user"]

        const checkValueRol = roles.some((rolSingle) => roleslByUser.includes(rolSingle));

        if(!checkValueRol) {
            handleHttpError(res, "USER_NOT_PERMISSION", 403);
            return;
        }

        next();
    } catch (error) {
        handleHttpError(res, "ERROR_PERMISSION", 403);
    }
}

module.exports = { checkRol };