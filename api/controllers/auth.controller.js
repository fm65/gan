const bcrypt   = require('bcrypt');
const models   = require('../models');
const jwtUtils = require('../utils').jwtUtils;


module.exports = {
    signup: function(req, res){

        // Params
        const firstName = req.body.firstName;
        const lastName  = req.body.lastName;
        const email     = req.body.email;
        const password  = req.body.password;

        if(firstName == null || lastName == null || email == null || password == null) {
            return res.status(400).json({ "error": "missing parameters" });
        }

        models.User.findOne({
            attributes: ['email'],
            where: {email: email}
        })
        .then(function(userFound){
            if (!userFound){
                bcrypt.hash(password, 10, function(err, bcryptebPassword){
                    const newUser = models.User.create({
                        firstName : firstName,
                        lastName  : lastName,
                        email     : email,
                        password  : bcryptebPassword,
                        mode      : 'normal'
                    })
                    .then(function(newUser){
                        return res.status(201).json({
                            "success": true,
                            "result": {
                                "message": "Signup successful"
                            } 
                        })
                    })
                    .catch(function(err){
                        return res.status(500).json({ "error" : "cannot add user" });
                    });
                });
            }
            else{
                return res.status(409).json({"error": "user already exist"});
            }
        })
        .catch(function(err){
            return res.status(500).json({"error": "unable to verify user"});
        });
    },

    login: function(req, res){

        // Params
        const email     = req.body.email;
        const password  = req.body.password;

        if(password == null || email == null) {
            return res.status(400).json({ "error": "missing parameters" });
        }

        models.User.findOne({
            where: {email: email}
        })
        .then(function(userFound){
            if (userFound){
                bcrypt.compare(password, userFound.password, function(
                                                    errBycrypt, resBycrypt){
                    if (resBycrypt) {
                        return res.status(200).json({
                            "success": true,
                            "result": {
                                "token": jwtUtils.generateTokenForUser(userFound),
                                "user": {
                                    "email": userFound.email
                                }
                            } 
                        });
                    }
                    else{
                        return res.status(403).json({"error": "invalid password"});
                    }
                });
            }
            else{
                return res.status(404).json({"error": "user not exist in database"});
            }
        })
        .catch(function(err){
            return res.status(500).json({ "error" : "unable to verify user" });
        });
    },

    logout: function(req, res){
        console.log('==== logout function ====')
    },

    users: function(req, res){
        const user = models.User.findByPk(req.decoded.id).then(userFound => {
            return res.status(200).json({
                "success": true,
                    "user": {
                        "email": userFound.email,
                        "mode": userFound.mode
                    }
            });
        }).catch(err => {
            console.log(err);
        });
        console.log('==== users function ====')
    }
}
