const models   = require('../models');

module.exports = {

    users: function(req, res){

        const user = models.User.findByPk(req.decoded.id)
        .then(userFound => {
            return res.status(200).json({
                status: "success",
                message: "auth successful",
                result: {
                    user: {
                        email: userFound.email,
                        role : userFound.role
                    }
                }
            });
        })
        .catch(err => {
            return res.status(403)
            .json({status: "error", message: "access denied"});
        });
    }
}
