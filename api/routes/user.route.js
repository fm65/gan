const controller = require('../controllers').userController;
const authJwt = require('../middlewares').authJwtMiddleware;

module.exports = function(app) {
  
    app.get('/api/v1/test/all', controller.allAccess);

    app.get("/api/test/user",
    	[authJwt.verifyToken],
    	controller.userBoard
    );

    app.get("/api/v1/test/mod",
    	[authJwt.verifyToken, authJwt.isModerator],
    	controller.moderatorBoard
    );

   app.get("/api/v1/test/admin",
    	[authJwt.verifyToken, authJwt.isAdmin],
    	controller.adminBoard
  );
};