const controller = require('../controllers').authController;
const verifySignUp = require('../middlewares').verifySignUpMiddleware;

module.exports = function(app) {
  
    app.post('/api/v1/signup',
      [verifySignUp.checkDuplicateEmail],
      controller.signup
    );

    app.post('/api/v1/signin', controller.signin);

    //app.delete('/api/v1/logout', AuthController.logout);

};
