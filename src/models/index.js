const models = {
    userModel: require('./nosql/users'),
    userGoogleModel: require('./nosql/usersgoogle'),
    clientModel: require('./nosql/clients'),
    hotelModel: require('./nosql/hotels'),
    subscriptionModel: require('./nosql/subscriptions'),
}

module.exports = models;