const AuthController = require('../controllers').AuthController;

module.exports = function(app) {

    app.post('/api/users/register', AuthController.register);

    app.post('/api/users/login', AuthController.login);
    

    /*app.delete('/api/users', async (req, res) => {

    });*/
};
