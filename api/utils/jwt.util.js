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
            role      : userData.role
        },
        process.env.TOKEN_SECRET_KEY,
        {
            expiresIn: '1d'
        }
        )
    }
}
