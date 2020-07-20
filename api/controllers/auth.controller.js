const models   = require('../models');
const User = models.User;

const Op = models.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


module.exports = {

  signup: (req, res) => {
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

signin: (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
      if (!user) {
        return res.status(404).json({
            status: "error", 
            message: "user not exist in database"
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 86400 // 24 hours
      });

      
        res.status(200).send({
          id          : user.id,
          firstName   : user.firstName,
          lastName    : user.lastName,
          email       : user.email,
          roles       : user.role,
          accessToken : token
        });
    }).catch(err => {
        return res.status(500).json({ 
            status: "error", 
            message: "cannot add user :" + err.message 
        });
    });
}
}