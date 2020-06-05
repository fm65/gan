const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET_KEY = '0ah&67uzhtxxi6&gd@ic?gb!dccv@@qs&sa?876@&@@234cc';

module.exports = {
    /**
     * @param userId  {integer}
     * @param mode    {boolean}
     * @returns       {string}
     */
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId : userData.id,
            mode    : userData.mode
        },
        JWT_SIGN_SECRET_KEY,
        {
            expiresIn: '2h'
        })
    }
}
