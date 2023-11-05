const bcryptjs = require('bcryptjs');

// No encrypted password
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash
};

// Pass unencrypted password and pass encrypted password and compare
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
};

module.exports = { encrypt, compare }