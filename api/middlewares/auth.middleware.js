const jwt = require('jsonwebtoken');

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
        
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) =>{
            if (err) return res.status(403)
                .json({status: "error", message: "access denied"});
            req.decoded = decoded;
            next();
        })
	},

	authRole: function(role){
		return (req, res, next) => {
			if (req.user.role !== role){
				return res.status(401)
				.json({ status: "error", message: "access not allowed" });
			}

			next();
		} 
	},
}