const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * @param userId  {integer}
     * @param mode    {boolean}
     * @returns       {string}
     */
    generateTokenForUser: function(userData){
        return jwt.sign({
            id        : userData.id,
            firstName : userData.firstName,
            lastName  : userData.lastName,
            email     : userData.email,
            mode      : userData.mode
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: '1d'
        }
        )
    }
}
