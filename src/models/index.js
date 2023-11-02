const models = {
    userModel: require('./nosql/users'),
    userGoogleModel: require('./nosql/usersgoogle'),
    clientModel: require('./nosql/clients'),
    hotelModel: require('./nosql/hotels')
}

module.exports = models;