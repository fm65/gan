const AuthController = require('../controllers').AuthController;
const autheMiddlewares = require('../middlewares').autheMiddlewares;

module.exports = function(app) {

    app.post('/api/users/signup', AuthController.signup);

    app.post('/api/users/login', AuthController.login);

    app.delete('/api/users/logout', AuthController.logout);

    app.get('/api/users', autheMiddlewares.authUser, AuthController.users);
};
