const AuthController = require('../controllers').AuthController;

module.exports = function(app) {

    app.post('/api/users/signup', AuthController.signup);

    app.post('/api/users/login', AuthController.login);

    app.get('/api/users/logout', AuthController.logout);

    app.get('/api/users', AuthController.authUser, AuthController.users);
};
