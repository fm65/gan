const AuthController = require('../controllers').AuthController;
const AuthMiddleware = require('../middlewares').AuthMiddleware;

module.exports = function(app) {

    app.post('/api/v1/signup', AuthController.signup);

    app.post('/api/v1/login', AuthController.login);

    //app.post('/api/v1/admin', AuthController.admin);

    app.delete('/api/v1/logout', AuthController.logout);

};
