const UserController = require('../controllers').UserController;
const AuthMiddleware = require('../middlewares').AuthMiddleware;

module.exports = function(app) {

    app.get('/api/v1/users', AuthMiddleware.authUser, UserController.users);

    app.get('/api/v1/users/:id', AuthMiddleware.authUser, UserController.users);

    app.put('/api/v1/users/:id', AuthMiddleware.authUser, UserController.users);

    app.delete('/api/v1/users/:id', AuthMiddleware.authUser, UserController.users);
};