const jwt    = require('jsonwebtoken');
const models = require('../models');

global.tokenFlag = true;

module.exports = {

	authUser: function(req, res, next){
		const authHeader = req.headers['authorization'];
        let token = authHeader && authHeader.split(' ')[1];

        if (tokenFlag == false){ // destroying authentication
        	token = null
        }
        if (token == null){
        	return res.status(401)
            .json({status: "error", message: "access required"})	
        }
        
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) =>{
            if (err) return res.status(403)
                .json({status: "error", message: "access denied"});
            req.user = user;
            next();
        })
	},

	/*authRole: function(req, res, next){
		models.User.findOne({
            where: {email: req.user.email}
        })
        .then(function(userFound){
        	if (req.user.role !== userFound.role){
			return res.status(401)
			.json({ status: "error", message: "access not allowed" });
		}
        })
        .catch(function(err){
            return res.status(500)
            .json({status: "error", message: "unable to verify user" });
        });

		next(); 
	}*/

	authRole: function(role){
		return (req, res, next) => {
			if (req.user.role !== role){
				return res.status(401)
				.json({ status: "error", message: "access not allowed" });
			}

			next();
		} 
	}
}