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

        if(firstName == null || lastName == null || 
               email == null || password == null) {
            return res.status(400)
            .json({ status: "error", message: "missing parameters" });
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
                        role      : 'USER'
                    })
                    .then(function(newUser){
                        return res.status(201).json({
                            status: "success",
                            message: "signup successful"
                        })
                    })
                    .catch(function(err){
                        return res.status(500)
                        .json({ status: "error", message: "cannot add user" });
                    });
                });
            }
            else{
                return res.status(409)
                .json({status: "error", message: "user already exist"});
            }
        })
        .catch(function(err){
            return res.status(500)
            .json({status: "error", message: "unable to verify user"});
        });
    },

    login: function(req, res){

        // Params
        const email     = req.body.email;
        const password  = req.body.password;

        if(password == null || email == null) {
            return res.status(400)
            .json({ status: "error", message: "missing parameters" });
        }

        models.User.findOne({
            where: {email: email}
        })
        .then(function(userFound){
            if (userFound){
                bcrypt.compare(password, userFound.password, function(
                                            errBycrypt, resBycrypt){
                    if (resBycrypt) {
                        tokenFlag = true;
                        return res.status(200).json({
                            status: "success",
                            message: "login successful",
                            result: {
                                token : jwtUtils.generateTokenForUser(userFound),
                                user: {
                                    email: userFound.email,
                                    role : userFound.role 
                                }
                            } 
                        });
                    }
                    else{
                        return res.status(403)
                        .json({status: "error", message: "invalid password"});
                    }
                });
            }
            else{
                return res.status(404)
                .json({status: "error", message: "user not exist in database"});
            }
        })
        .catch(function(err){
            return res.status(500)
            .json({status: "error", message: "unable to verify user" });
        });
    },

    logout: function(req, res){
        
        tokenFlag = false;
        return res.status(204).end();
    }
}