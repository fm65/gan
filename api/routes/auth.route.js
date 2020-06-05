//const bodyParser     = require('body-parser');
const AuthController = require('../controllers').AuthController;

module.exports = function(app) {

    app.post('/api/users', AuthController.register);

    //app.post('/api/users', AuthController.login);
    

    /*app.delete('/api/users', async (req, res) => {

    });*/
};
