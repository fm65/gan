//const models   = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
	/**
     * @param userId  {integer}
     * @returns       {void}
     */
	authUser: function(req, res, next) {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (token == null) return res.status(401).json({"error": "access required"})
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) =>{
			if (err) return res.status(403).json({"error": "access denied"});
			console.log(Object.keys(decoded));
			req.decoded = decoded;
			next();
		})
	}
};